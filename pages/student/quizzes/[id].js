import Layout from "../../../Layout/Layout"
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";
import Card from '../../../components/Cards/Card'
import Image from "next/image"
import GeneralInstruction from "../../../components/Section/generalInstruction"
import Button from "../../../components/Button/button";
import Link from "next/link";
import MyTimer from '../../../components/Timer/MyTimer'
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

export default function Index() {
  const Router = useRouter()
  const { id } = Router.query
  const [dataExams, setDataExams] = useState({
    questions: [{
      options: [{
        selected: 0
      }]
    }]
  })
  const [activeQuestionId, setActiveQuestionId] = useState(0)
  const [sectionInstruction, setSectionInstruction] = useState(true)
  const [questionPaper, setQuestionPaper] = useState(false)
  const [duration, setDuration] = useState()
  const [reviewSubmit, setReviewSubmit] = useState({})
  const [result, setResult] = useState({
    score: 0,
    exam: {
      total_score: 0
    }
  })
  const [renderCount, setRenderCount] = useState(false)
  const time = new Date();
  const markAnswer = [
    {
      icon: "/asset/icon/table/ic_not_visited.svg",
      desc: "Not Visited"
    },
    {
      icon: "/asset/icon/table/ic_answer.svg",
      desc: "Answered"
    },
    {
      icon: "/asset/icon/table/ic_not_answer_mark.svg",
      desc: "Marked"
    },
    {
      icon: "/asset/icon/table/ic_not_answer.svg",
      desc: "Not Answered"
    },
    {
      icon: "/asset/icon/table/ic_answer_mark.svg",
      desc: "Marked and Answered"
    },
  ]
  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()
  const {
    isOpen: isResultModal,
    onOpen: onOpenResultsModal,
    onClose: onCloseResultModal
  } = useDisclosure()

  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.showQuiz(id)
        .then((res) => {
          console.log(res.data.data)
          setDataExams(res.data.data)
          // setDuration(res.data.data.duration)

          time.setSeconds(time.getSeconds() + res.data.data.duration * 60);
          console.log(res.data.data.duration)
          const dataResult = {
            total: res.data.data.questions.length,
            answered: 0,
            notAnswered: 0,
            marked: 0
          }
          setReviewSubmit({ ...dataResult })
        })
    }
    getData()
  }, [])

  useEffect(async () => {
    time.setSeconds(time.getSeconds() + dataExams.duration * 60);
  }, [duration])

  const submitTest = async () => {
    const data = JSON.stringify(dataExams)
    const res = {
      data: data
    }
    console.log(data)
    await apiStudentPage.storeQuiz(id, res)
      .then((res) => {
        console.log(res.data.data)
        setResult(res.data.data)
      })
  }

  useEffect(() => {
    console.log("start")
    const countReviewResult = () => {
      console.log("pertanyaan")
      let answerCount = []
      let marked = []
      dataExams.questions.map((itemQuestion) => {
        if (itemQuestion.status === 'answered') {
          answerCount.push("answer")

        }
        if (itemQuestion.status === 'marked') {
          marked.push("marked")
        }
        if (itemQuestion.status === 'marked_and_answered') {
          marked.push("marked")
          answerCount.push("answer")
        }
      })
      let temp = reviewSubmit
      console.log(answerCount.length)
      temp.answered = answerCount.length,
        temp.notAnswered = temp.total - answerCount.length,
        temp.marked = marked.length
      console.log(temp)
      setReviewSubmit({ ...temp })
    }
    // console.log(reviewSubmit)
    countReviewResult()
  }, [renderCount])

  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <div className="flex gap-4">
        <div className="w-full">
          <div className="flex overflow-x-hidden p-2 md:hidden flex-wrap gap-4">
            {dataExams.questions.map((item, index) => (
              <div key={index} className={` 
                    ${index === activeQuestionId && item.status !== 'marked' && item.status !== 'marked_and_answered' && item.status !== 'answered' && item.status !== 'not_answered' && 'rounded-full'} 
                    ${item.status === 'marked' && 'bg-purple-1 rounded-full border-1 border-purple-2'} 
                    ${item.status === 'marked_and_answered' && 'relative bg-purple-100 rounded-full border-1 border-purple-2'} 
                    ${item.status === 'answered' && 'bg-green-3 rounded-t-full border-1 border-green-1'}
                    ${item.status === 'not_answered' && 'bg-red-2 rounded-b-full border-1 border-red-1'}
                    cursor-pointer flex w-12 h-12 border rounded`} onClick={() => setActiveQuestionId(index)}>
                {item.status === 'marked_and_answered' && (
                  <div className="absolute bottom-2 right-0 rounded-full bg-green-1 w-2 h-2" />
                )}
                <div className="flex align-middle text-center m-auto">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <Card>
            {sectionInstruction && (
              <div>
                <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.instruction }} />
                <div className="flex">
                  <div className="w-full" />
                  <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                    onClick={() => {
                      setSectionInstruction(false)
                      // setDuration(dataExams.duration)
                    }}>Continue to Question</button>
                </div>
              </div>
            )}

            {sectionInstruction === false && questionPaper === false && (
              <>
                {dataExams.questions[activeQuestionId]?.count && (
                  <div className="font-bold">Questions {activeQuestionId + 1}-{activeQuestionId + dataExams.questions[activeQuestionId]?.count} refer to the following passage</div>
                )}
                <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.questions[activeQuestionId]?.q_instruction }} />
                <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.questions[activeQuestionId]?.q_paragraph }} />
                <h1 className="font-bold my-2">Question {activeQuestionId + 1}</h1>
                <div className="text-container" dangerouslySetInnerHTML={{ __html: dataExams.questions[activeQuestionId]?.question }} />
                {dataExams.questions[activeQuestionId].options.map((itemAnswer, indexAnswer) => {
                  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                  return (
                    <div className={`${dataExams.questions[activeQuestionId].options[indexAnswer].selected === 1 ? 'bg-blue-6 border-blue-1' : 'bg-white'} my-2  p-3 border rounded-lg`} key={indexAnswer}>
                      <div className='flex  gap-2'>
                        {dataExams.questions[activeQuestionId].answer_type === 'single' ? (
                          <div className="flex cursor-pointer" onClick={() => {
                            const temp = dataExams.questions
                            temp.map((itemQ) => {
                              if (itemQ.id === dataExams.questions[activeQuestionId].id) {
                                itemQ.options.map((optionQ) => {
                                  if (optionQ.id === itemAnswer.id) {
                                    optionQ.selected = 1
                                  } else {
                                    for (let i = 0; i < itemQ.options.length; i++) {
                                      if (i !== indexAnswer) {
                                        optionQ.selected = 0
                                      }
                                    }
                                  }
                                })
                              } else {
                                itemQ
                              }
                            })
                            const tempExam = dataExams
                            tempExam.map((itemSection) => {
                              if (itemSection.id === dataExams.id) {
                                itemSection.questions = temp
                              }
                            })
                            setDataExams({ ...tempExam })
                          }}>
                            <div className="m-auto" >
                              {itemAnswer.selected === 1 ? (
                                <Image src='/asset/icon/table/ic_radio_active.svg' width={16} height={16} alt="icon radio button" />
                              ) : (
                                <div className="border w-4 rounded-full h-4" />
                              )}
                            </div>
                          </div>
                        ) : (
                          // if multiple answer
                          <div className="flex cursor-pointer" onClick={() => {
                            const temp = dataExams.questions
                            temp.map((itemQ) => {
                              if (itemQ.id === dataExams.questions[activeQuestionId].id) {
                                itemQ.options.map((optionQ) => {
                                  if (optionQ.id === itemAnswer.id) {
                                    const tempCorrect = optionQ.selected
                                    optionQ.selected = tempCorrect === 1 ? 0 : 1
                                  }
                                })
                              } else {
                                itemQ
                              }
                            })
                            const tempExam = dataExams
                            tempExam.questions = temp
                            setDataExams({ ...tempExam })
                          }}>
                            <div className="m-auto" >
                              {itemAnswer.selected === 1 ? (
                                <Image src='/asset/icon/table/ic_checkbox_active.svg' width={16} height={16} alt="icon radio button" />
                              ) : (
                                <div className="border w-4 rounded h-4" />
                              )}
                            </div>
                          </div>

                          // <input className="m-auto" type="checkbox" id="html" {...register(`questions[${indexEachQuestion}].options[${indexAnswer}].correct`)} value="1" />
                        )}
                        <span>{alphabet[indexAnswer]}.</span>
                        <div>{itemAnswer.title}</div>
                      </div>
                    </div>
                  )
                })}
                <div className="md:flex flex-row gap-4 ">
                  <div className="w-full mt-4">
                    {dataExams.questions.length !== activeQuestionId + 1 && (
                      <button className={`text-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => {
                        const temp = dataExams.questions
                        temp.map((itemQ) => {
                          if (itemQ.id === dataExams.questions[activeQuestionId].id) {
                            itemQ.status = 'marked'
                            itemQ.options.map((optionQ) => {
                              if (optionQ.selected === 1) {
                                optionQ.selected = 1
                                itemQ.status = 'marked_and_answered'
                              }
                            })
                          } else {
                            itemQ
                          }
                        })
                        const tempExam = dataExams
                        tempExam.questions = temp
                        setDataExams({ ...tempExam })
                        setActiveQuestionId(activeQuestionId + 1)
                        setRenderCount(!renderCount)
                      }} >Mark Question and Next</button>
                    )}
                  </div>
                  <div className="w-full mt-4">
                    {dataExams.questions.length !== activeQuestionId + 1 && (
                      <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                        onClick={() => {
                          const temp = dataExams.questions
                          temp.map((itemQ) => {
                            if (itemQ.id === dataExams.questions[activeQuestionId].id) {
                              itemQ.status = 'not_answered'
                              itemQ.options.map((optionQ) => {
                                if (optionQ.selected === 1) {
                                  optionQ.selected = 1
                                  itemQ.status = 'answered'
                                }
                              })
                            } else {
                              itemQ
                            }
                          })
                          const tempExam = dataExams
                          tempExam.questions = temp
                          setDataExams({ ...tempExam })
                          setActiveQuestionId(activeQuestionId + 1)
                          setRenderCount(!renderCount)
                        }}>Save and Next Question</button>
                    )}
                    {dataExams.questions.length === activeQuestionId + 1 && (
                      <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                        onClick={onOpenSuccessModal}>Submit Test</button>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
        <div className="md:w-1/2 lg:w-1/3 hidden lg:flex">
          <Card>
            <div className="bg-black-9 text-center p-2 rounded">
              Remaining time
              <MyTimer expired={time} />
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {markAnswer.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Image src={item.icon} height={32} width={32} />
                  <span className="my-auto">{item.desc}</span>
                </div>
              ))}
            </div>
            <div className="bg-black-9 p-2 mt-4">
              <h1 className="font-bold my-2">{reviewSubmit.answered} of &nbsp;
                {dataExams.questions.length} Question Answered</h1>
              <div className="flex flex-wrap gap-2">
                {dataExams.questions.map((item, index) => (
                  <div key={index} className={` 
                    ${index === activeQuestionId && item.status !== 'marked' && item.status !== 'marked_and_answered' && item.status !== 'answered' && item.status !== 'not_answered' && 'rounded-full'} 
                    ${item.status === 'marked' && 'bg-purple-1 rounded-full border-1 border-purple-2'} 
                    ${item.status === 'marked_and_answered' && 'relative bg-purple-100 rounded-full border-1 border-purple-2'} 
                    ${item.status === 'answered' && 'bg-green-3 rounded-t-full border-1 border-green-1'}
                    ${item.status === 'not_answered' && 'bg-red-2 rounded-b-full border-1 border-red-1'}
                    cursor-pointer flex w-12 h-12 border rounded`} onClick={() => setActiveQuestionId(index)}>
                    {item.status === 'marked_and_answered' && (
                      <div className="absolute bottom-2 right-0 rounded-full bg-green-1 w-2 h-2" />
                    )}
                    <div className="flex align-middle text-center m-auto">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl mt-4`}
              onClick={onOpenSuccessModal}>Submit Test</button>
          </Card>
        </div>
      </div>
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} size={"lg"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="medium"><center>Submit Test</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="bg-red-100 overflow-auto">
              <table className="table min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-black-9" >
                  <th scope="col" className="text-left px-6 tracking-wider h-12">
                    No.of Question
                  </th>
                  <th scope="col" className="text-left px-6 tracking-wider h-12">
                    Answered
                  </th>
                  <th scope="col" className="text-left px-6 tracking-wider h-12">
                    Not Answered
                  </th>
                  <th scope="col" className="text-left px-6 tracking-wider h-12">
                    Marked for Review
                  </th>
                  {/* </tr> */}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 h-12 whitespace-nowrap">
                      <div>{reviewSubmit.total}</div>
                    </td>
                    <td className="px-6 h-12 whitespace-nowrap">
                      <div>{reviewSubmit.answered}</div>
                    </td>
                    <td className="px-6 h-12 whitespace-nowrap">
                      <div>{reviewSubmit.notAnswered}</div>
                    </td>
                    <td className="px-6 h-12 whitespace-nowrap">
                      <div>{reviewSubmit.marked}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="mr-4 test-sm cursor-pointer" onClick={onCloseSuccessModal}>
              Cancel
            </div>
            <div onClick={() => {
              submitTest()
              onCloseSuccessModal()
              onOpenResultsModal()
            }}><Button title="Submit Test" /></div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isResultModal} onClose={onCloseResultModal} size={"lg"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="medium"><center>Test Result</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex">
              <div className="text-center mx-auto text-blue-1 bg-blue-6 border-blue-1 rounded border p-2">
                {result.score}/{result.exam.total_score}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <div onClick={() => {
              onCloseResultModal()
            }}><Button title="Close" />
            </div> */}
            <Link href="/student/exams">
              <a>
                <Button title="Close" />
              </a>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

Index.layout = Layout
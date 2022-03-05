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
    sections: [{
      question_items: [{
        options: [{
          selected: 0
        }]
      }]
    }]
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [agree, setAgree] = useState(false)
  const [activeSection, setActiveSection] = useState()
  const [activeSectionId, setActiveSectionId] = useState(0)
  const [activeQuestionId, setActiveQuestionId] = useState(0)
  const [sectionInstruction, setSectionInstruction] = useState(false)
  const [questionPaper, setQuestionPaper] = useState(false)
  const [duration, setDuration] = useState()
  const [reviewSubmit, setReviewSubmit] = useState([])
  const [numberQuestion, setNumberQuestion] = useState()
  const [result, setResult] = useState({
    score: 0,
    exam: {
      total_score: 0
    }
  })
  const [renderCount, setRenderCount] = useState(false)
  const time = new Date();
  const newTime = new Date()
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
      await apiStudentPage.showExams(id)
        .then((res) => {
          console.log(res.data.data)
          setDataExams(res.data.data)
          setActiveSection(res.data.data.sections[0].name)
          const Rsubmit = []
          res.data.data.sections.map((item) => {
            const dataResult = {
              name: item.name,
              total: item.question_items.length,
              answered: 0,
              notAnswered: 0,
              marked: 0
            }
            Rsubmit.push(dataResult)
          })
          setReviewSubmit(Rsubmit)
        })
    }
    getData()
  }, [])

  useEffect(async () => {
    time.setSeconds(time.getSeconds() + dataExams.sections[activeSectionId].duration * 60);
  }, [duration])

  const submitTest = async () => {
    const temp = dataExams
    dataExams.sections.map((itemSection) => {
      itemSection.question_items.map((item) => {
        if (item.answer_type === 'multiple') {
          if (item.status === 'answered' || item.status === 'marked_and_answered') {
            item.options.map((itemOption) => {
              itemOption.selected = itemOption.selected === 1 ? 1 : 0
            })
          }
        }
      })
    })
    const data = JSON.stringify(temp)
    const res = {
      data: data
    }
    console.log(data)
    await apiStudentPage.storeExams(id, res)
      .then((res) => {
        console.log(res.data.data)
        setResult(res.data.data)
      })
  }

  useEffect(() => {
    console.log("start")
    const countReviewResult = () => {

      dataExams.sections.map((itemSection) => {
        console.log("pertanyaan")
        let answerCount = []
        let marked = []
        itemSection.question_items.map((itemQuestion) => {
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
        let totalAnswer = answerCount.length
        const result = []
        const Rsubmit = []
        temp.map((item) => {
          if (item.name === itemSection.name) {
            item.name = item.name,
              item.total = item.total,
              item.answered = answerCount.length,
              item.notAnswered = item.total - answerCount.length,
              item.marked = marked.length
          } else {
            item
          }
        })
        console.log(temp)
        setReviewSubmit([...temp])
      })
    }
    // console.log(reviewSubmit)
    countReviewResult()
  }, [renderCount])

  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      {currentStep === 1 && (<GeneralInstruction />)}
      {currentStep === 2 && (
        <Card>
          <h1 className="font-bold text-xl">{dataExams?.name}</h1>
          <div className="text-container" dangerouslySetInnerHTML={{ __html: dataExams?.instruction }} />
          <div className="flex gap-2">
            <div className="my-auto cursor-pointer" onClick={() => setAgree(!agree)} >
              {agree ? (
                <Image src='/asset/icon/table/ic_checkbox_active.svg' width={12} height={12} alt="icon radio button" />
              ) : (
                <div className="border w-3 rounded h-3" />
              )}
            </div>
            <span>I have read and agree to follow instruction above</span>
          </div>
          {agree ? 'setuju' : 'tidak'}
        </Card>
      )}

      {currentStep === 3 && (
        <div className="flex gap-4">
          <div className="w-full">
            <div className="flex  gap-4 bg-white rounded-lg pt-4 px-4 mb-4">
              {dataExams.sections.map((item, index) => (
                <div key={index} className={` ${activeSection === item.name ? 'text-blue-1 border-b-2 border-blue-1 font-bold' : 'text-black-5'}  pb-4`}>
                  {item?.name}
                </div>
              ))}
            </div>
            <div className="flex overflow-x-scroll p-2 md:hidden ">

              {dataExams.sections[activeSectionId].question_items.map((item, index) => (
                <div id={index}>
                  <div key={index} className={` 
                    ${index === activeQuestionId && item.status !== 'marked' && item.status !== 'marked_and_answered' && item.status !== 'answered' && item.status !== 'not_answered' && 'rounded-full'} 
                    ${item.status === 'marked' && 'bg-purple-1 rounded-full border-1 border-purple-2'} 
                    ${item.status === 'marked_and_answered' && 'relative bg-purple-100 rounded-full border-1 border-purple-2'} 
                    ${item.status === 'answered' && 'bg-green-3 rounded-t-full border-1 border-green-1'}
                    ${item.status === 'not_answered' && 'bg-red-2 rounded-b-full border-1 border-red-1'}
                    cursor-pointer flex-nowrap w-12 flex  h-12 border rounded m-2`} onClick={() => setActiveQuestionId(index)}>
                    {item.status === 'marked_and_answered' && (
                      <div className="absolute bottom-2 right-0 rounded-full bg-green-1 w-2 h-2" />
                    )}
                    <div className="flex align-middle text-center m-auto">
                      {index + 1}
                    </div>
                  </div> </div>
              ))}
            </div>
            <Card>
              {sectionInstruction && (
                <div>
                  <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].instruction }} />
                  <div className="flex">
                    <div className="w-full" />
                    <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                      onClick={() => {
                        setSectionInstruction(false)
                      }}>Continue to Question</button>
                  </div>
                </div>
              )}

              {questionPaper && (
                <div>
                  <center className="font-bold">Question Paper</center>
                  {dataExams.sections[activeSectionId].question_items.map((item, index) => (
                    <div key={index} className="flex border-b my-2 p-2">
                      <div>{index + 1}) &nbsp; </div>
                      <div> {item.question} </div>
                    </div>
                  ))}
                  <div className="flex">
                    <div className="w-full" />
                    <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                      onClick={() => {
                        setQuestionPaper(false)
                      }}>Close Question Paper</button>
                  </div>
                </div>
              )}
              {sectionInstruction === false && questionPaper === false && (
                <>
                  {dataExams.sections[activeSectionId].question_items[activeQuestionId]?.count && (
                    <div className="font-bold">Questions {activeQuestionId + 1}-{activeQuestionId + dataExams.sections[activeSectionId].question_items[activeQuestionId]?.count} refer to the following passage</div>
                  )}
                  <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId]?.q_instruction }} />
                  <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId]?.q_paragraph }} />
                  <h1 className="font-bold my-2">Question {activeQuestionId + 1}</h1>
                  <div className="text-container" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId]?.question }} />
                  {dataExams.sections[activeSectionId].question_items[activeQuestionId].options.map((itemAnswer, indexAnswer) => {
                    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    if (itemAnswer.new) {
                      setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].new`, true)
                      if (itemAnswer.correct === null) {
                        setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`, 0)
                      }
                    }
                    return (
                      <div className={`${dataExams.sections[activeSectionId].question_items[activeQuestionId].options[indexAnswer].selected === 1 ? 'bg-blue-6 border-blue-1' : 'bg-white'} my-2  p-3 border rounded-lg`} key={indexAnswer}>
                        <div className='flex  gap-2'>
                          {dataExams.sections[activeSectionId].question_items[activeQuestionId].answer_type === 'single' ? (
                            <div className="flex cursor-pointer" onClick={() => {
                              const temp = dataExams.sections[activeSectionId].question_items
                              temp.map((itemQ) => {
                                if (itemQ.id === dataExams.sections[activeSectionId].question_items[activeQuestionId].id) {
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
                              tempExam.sections.map((itemSection) => {
                                if (itemSection.id === dataExams.sections[activeSectionId].id) {
                                  itemSection.question_items = temp
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
                              const temp = dataExams.sections[activeSectionId].question_items
                              temp.map((itemQ) => {
                                if (itemQ.id === dataExams.sections[activeSectionId].question_items[activeQuestionId].id) {
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
                              tempExam.sections.map((itemSection) => {
                                if (itemSection.id === dataExams.sections[activeSectionId].id) {
                                  itemSection.question_items = temp
                                }
                              })
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

                            // <input className="m-auto" type="checkbox" id="html" {...register(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`)} value="1" />
                          )}
                          <span>{alphabet[indexAnswer]}.</span>
                          <div>{itemAnswer.title}</div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="md:flex flex-row gap-4 ">
                    <div className="w-full mt-4">
                      {dataExams.sections[activeSectionId].question_items.length !== activeQuestionId + 1 && (
                        <button className={`text-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => {
                          const temp = dataExams.sections[activeSectionId].question_items
                          temp.map((itemQ) => {
                            if (itemQ.id === dataExams.sections[activeSectionId].question_items[activeQuestionId].id) {
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
                          tempExam.sections.map((itemSection) => {
                            if (itemSection.id === dataExams.sections[activeSectionId].id) {
                              itemSection.question_items = temp
                            }
                          })
                          setDataExams({ ...tempExam })
                          setActiveQuestionId(activeQuestionId + 1)
                          setRenderCount(!renderCount)
                        }} >Mark Question and Next</button>
                      )}
                    </div>
                    <div className="w-full mt-4">
                      {dataExams.sections[activeSectionId].question_items.length !== activeQuestionId + 1 && (
                        <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                          onClick={() => {
                            const temp = dataExams.sections[activeSectionId].question_items
                            temp.map((itemQ) => {
                              if (itemQ.id === dataExams.sections[activeSectionId].question_items[activeQuestionId].id) {
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
                            tempExam.sections.map((itemSection) => {
                              if (itemSection.id === dataExams.sections[activeSectionId].id) {
                                itemSection.question_items = temp
                              }
                            })
                            setDataExams({ ...tempExam })
                            setActiveQuestionId(activeQuestionId + 1)
                            setRenderCount(!renderCount)
                          }}>Save and Next Question</button>
                      )}
                      {dataExams.sections[activeSectionId].question_items.length === activeQuestionId + 1 && dataExams.sections.length !== activeSectionId + 1 && (
                        <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                          onClick={() => {
                            setActiveSectionId(activeSectionId + 1)
                            setActiveSection(dataExams.sections[activeSectionId + 1].name)
                            setActiveQuestionId(0)
                            setDuration(dataExams.sections[activeSectionId + 1].duration)
                            newTime.setSeconds(time.getSeconds() + dataExams.sections[activeSectionId].duration * 60)
                            setRenderCount(!renderCount)
                          }}>Save and Continue to Next Section</button>
                      )}
                      {dataExams.sections[activeSectionId].question_items.length === activeQuestionId + 1 && dataExams.sections.length === activeSectionId + 1 && (
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
                {activeSectionId === 0 ? (
                  <MyTimer expired={time} />
                ) : (
                  <MyTimer newExpiry={time} rerender={duration} />
                )}
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
                <h1 className="font-bold my-2">{reviewSubmit[activeSectionId].answered} of &nbsp;
                  {dataExams.sections[activeSectionId].question_items.length} Question Answered</h1>
                <div className="flex flex-wrap gap-2">
                  {dataExams.sections[activeSectionId].question_items.map((item, index) => (
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
              <div className="flex gap-4 mt-4">
                <button className={`text-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => {
                  setQuestionPaper(true)
                  setSectionInstruction(false)
                }}   >Question Paper</button>
                <button className={`text-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => {
                  setSectionInstruction(true)
                  setQuestionPaper(false)
                }} >Instruction</button>
              </div>
              <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl mt-4`}
                onClick={onOpenSuccessModal}>Submit Test</button>
            </Card>
          </div>
        </div>
      )}

      {/* previous next */}
      <div className="flex -z-10 gap-4 flex-row-reverse my-4">
        {currentStep === 1 && (
          <>
            <div className='cursor-pointer' onClick={() => setCurrentStep(2)} ><Button title="Continue" /></div>
            <Link href="/student/exams">
              <a>
                <button className={`text-blue-1 border border-blue-1 py-2 px-4 font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} >Back to Exams</button>
              </a>
            </Link>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className={`${agree ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => {
              setCurrentStep(3)
              setSectionInstruction(true)
              setDuration(dataExams.sections[activeSectionId].duration)
            }} ><Button title="Begin Exam" /></div>
            <button className={`text-blue-1 border border-blue-1 py-2 px-4 font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => setCurrentStep(1)} >Back</button>
          </>
        )}
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
                  <th
                    scope="col"
                    className="px-6 h-12 text-left tracking-wider"
                  >Section
                  </th>
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
                  {reviewSubmit.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 h-12 whitespace-nowrap">
                        <div>{item.name}</div>
                      </td>
                      <td className="px-6 h-12 whitespace-nowrap">
                        <div>{item.total}</div>
                      </td>
                      <td className="px-6 h-12 whitespace-nowrap">
                        <div>{item.answered}</div>
                      </td>
                      <td className="px-6 h-12 whitespace-nowrap">
                        <div>{item.notAnswered}</div>
                      </td>
                      <td className="px-6 h-12 whitespace-nowrap">
                        <div>{item.marked}</div>
                      </td>
                    </tr>
                  ))}
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
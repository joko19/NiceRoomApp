import LayoutTest from "../../../../Layout/LayoutTest"
import apiStudentPage from "../../../../action/student_page"
import { useState, useEffect } from "react";
import Card from '../../../../components/Cards/Card'
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Index() {
  const Router = useRouter()
  const { id } = Router.query
  const { idResult } = Router.query
  const [dataExams, setDataExams] = useState({
    sections: [{
      question_items: [{
        options: [{
          selected: 0
        }],
        result_details: [{
          correct: 0
        }]
      }]
    }]
  })
  const [activeSection, setActiveSection] = useState()
  const [activeSectionId, setActiveSectionId] = useState(0)
  const [activeQuestionId, setActiveQuestionId] = useState(0)
  const [reviewSubmit, setReviewSubmit] = useState([])
  const [renderCount, setRenderCount] = useState(false)
  const [data, setData] = useState()
  const markAnswer = [
    {
      icon: "/asset/icon/table/ic_answer.svg",
      desc: "Correct"
    },
    {
      icon: "/asset/icon/table/ic_not_answer.svg",
      desc: "Incorrect"
    },
  ]

  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.showPracticeResult(id, idResult)
        .then((res) => {
          setData(res.data.data)
          setDataExams(res.data.data.exam)
          setActiveSection(res.data.data.exam.sections[0].name)
          const Rsubmit = []
          res.data.data.exam.sections.map((item) => {
            const dataResult = {
              name: item.name,
              total: item.question_items.length,
            }
            Rsubmit.push(dataResult)
          })
          console.log(Rsubmit)
          setReviewSubmit(Rsubmit)
          setRenderCount(!renderCount)
        })
    }
    getData()
  }, [])


  useEffect(() => {
    console.log("start")
    const countReviewResult = () => {
      dataExams.sections.map((itemSection) => {
        console.log("pertanyaan")
        let answerCount = []
        itemSection.question_items.map((itemQuestion) => {
          if (itemQuestion.result_details[0].correct === 1) {
            answerCount.push("correct")
          }
        })
        let temp = reviewSubmit
        console.log(reviewSubmit)
        console.log(answerCount.length)
        temp.map((item) => {
          if (item.name === itemSection.name) {
            item.name = item.name,
              item.total = item.total,
              item.correct = answerCount.length
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
              <div key={index} id={index}>
                <div key={index} className={` 
                    ${item.result_details[0].correct === 1 && 'bg-green-3 rounded-t-full border-1 border-green-1'}
                    ${item.result_details[0].correct === 0 && 'bg-red-2 rounded-b-full border-1 border-red-1'}
                    cursor-pointer flex-nowrap w-12 flex  h-12 border rounded m-2`} onClick={() => setActiveQuestionId(index)}>
                  <div className="flex align-middle text-center m-auto">
                    {index + 1}
                  </div>
                </div> </div>
            ))}
          </div>
          <Card>
            {dataExams.sections[activeSectionId].question_items[activeQuestionId]?.count && (
              <div className="font-bold">Questions {activeQuestionId + 1}-{activeQuestionId + dataExams.sections[activeSectionId].question_items[activeQuestionId]?.count} refer to the following passage</div>
            )}
            <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId]?.q_instruction }} />
            <div className="text-container ml-3" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId]?.q_paragraph }} />
            <h1 className="font-bold my-2">Question {activeQuestionId + 1}</h1>
            <div className="text-container" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId]?.question }} />
            {dataExams.sections[activeSectionId].question_items[activeQuestionId]?.options.map((itemAnswer, indexAnswer) => {
              const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
              if (itemAnswer.new) {
                setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].new`, true)
                if (itemAnswer.correct === null) {
                  setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`, 0)
                }
              }
              return (
                <div className={`${dataExams.sections[activeSectionId].question_items[activeQuestionId]?.options[indexAnswer].correct === 1 ? 'bg-blue-6 border-blue-1' : 'bg-white'} my-2  p-3 border rounded-lg`} key={indexAnswer}>
                  <div className='flex  gap-2'>
                    {dataExams.sections[activeSectionId].question_items[activeQuestionId].answer_type === 'single' ? (
                      <div className="flex">
                        <div className="m-auto" >
                          {itemAnswer.correct === 1 ? (
                            <Image src='/asset/icon/table/ic_radio_active.svg' width={16} height={16} alt="icon radio button" />
                          ) : (
                            <div className="border w-4 rounded-full h-4" />
                          )}
                        </div>
                      </div>
                    ) : (
                      // if multiple answer
                      <div className="flex">
                        <div className="m-auto" >
                          {itemAnswer.correct === 1 ? (
                            <Image src='/asset/icon/table/ic_checkbox_active.svg' width={16} height={16} alt="icon radio button" />
                          ) : (
                            <div className="border w-4 rounded h-4" />
                          )}
                        </div>
                      </div>
                    )}
                    <span>{alphabet[indexAnswer]}.</span>
                    <div>{itemAnswer.title}</div>
                  </div>
                </div>
              )
            })}
            <div className="font-bold mt-4">Answer Explanation</div>
            <div className="text-container" dangerouslySetInnerHTML={{ __html: dataExams.sections[activeSectionId].question_items[activeQuestionId].answer_explanation }} />
            <div className="md:flex flex-row gap-4 ">
              <div className="w-full mt-4">
                {activeQuestionId !== 0 && (
                  <button className={`text-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => {
                    setActiveQuestionId(activeQuestionId - 1)
                  }} >Previous</button>
                )}
              </div>
              <div className="w-full mt-4">
                {dataExams.sections[activeSectionId].question_items.length !== activeQuestionId + 1 && (
                  <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                    onClick={() => {
                      setActiveQuestionId(activeQuestionId + 1)
                    }}>Next</button>
                )}
                {dataExams.sections[activeSectionId].question_items.length === activeQuestionId + 1 && dataExams.sections.length !== activeSectionId + 1 && (
                  <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                    onClick={() => {
                      setActiveSectionId(activeSectionId + 1)
                      setActiveSection(dataExams.sections[activeSectionId + 1].name)
                      setActiveQuestionId(0)
                    }}>Continue to Next Section</button>
                )}
              </div>
            </div>
          </Card>
        </div>
        <div className="md:w-1/2 lg:w-1/3 hidden lg:flex">
          <Card>
            <div className="bg-black-9 text-center p-2 rounded">
              Test Result
              <div className="font-bold text-blue-1 text-2xl">{data?.score}/{data?.exam?.total_score}</div>
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
              <h1 className="font-bold my-2">{reviewSubmit[activeSectionId]?.correct} of &nbsp;
                {dataExams.sections[activeSectionId].question_items.length} Question Answered</h1>
              <div className="flex flex-wrap gap-2">
                {dataExams.sections[activeSectionId].question_items.map((item, index) => (
                  <div key={index} className={` 
                    ${index === activeQuestionId && item.status !== 'marked' && item.status !== 'marked_and_answered' && item.status !== 'answered' && item.status !== 'not_answered' && 'rounded-full'} 
                    ${item.result_details[0].correct === 1 && 'bg-green-3 rounded-t-full border-1 border-green-1'}
                    ${item.result_details[0].correct === 0 && 'bg-red-2 rounded-b-full border-1 border-red-1'}
                    cursor-pointer flex w-12 h-12 border rounded`} onClick={() => setActiveQuestionId(index)}>
                    <div className="flex align-middle text-center m-auto">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/student/exams">
              <a>
                <button className={`text-blue-1 border w-full mt-4 border-blue-1 py-2 px-4 font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} >Back to List Exams</button>
              </a>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}

// This also gets called at build time
export async function getServerSideProps(context) {
  return { props: {} }
}
Index.layout = LayoutTest
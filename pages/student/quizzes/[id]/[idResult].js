import Layout from "../../../../Layout/Layout"
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
  const [data, setData] = useState()
  const [dataExams, setDataExams] = useState({
    questions: [{
      options: [{
        selected: 0
      }],
      result_details: [{
        correct: 0
      }
      ]
    }]
  })
  const [activeQuestionId, setActiveQuestionId] = useState(0)
  const [correctTotal, setCorrectTotal] = useState()
  const time = new Date();
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
      await apiStudentPage.showQuizResult(id, idResult)
        .then((res) => {
          setData(res.data.data)
          setDataExams(res.data.data.quiz)
          let answerCount = []
          res.data.data.quiz.questions.map((itemQuestion) => {
            if (itemQuestion.result_details[0].correct === 1) {
              answerCount.push("correct")
            }
          })
          setCorrectTotal(answerCount.length)
        })
    }
    getData()
  }, [])

  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <div className="flex gap-4">
        <div className="w-full">
          <div className="flex overflow-x-hidden p-2 md:hidden flex-wrap gap-4">
            {dataExams.questions.map((item, index) => (
              <div key={index} className={`
                    ${item.result_details[0].correct === 1 && 'bg-green-3 rounded-t-full border-1 border-green-1'}
                    ${item.result_details[0].correct === 0 && 'bg-red-2 rounded-b-full border-1 border-red-1'}
                    cursor-pointer flex w-12 h-12 border rounded`} onClick={() => setActiveQuestionId(index)}>
                <div className="flex align-middle text-center m-auto">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <Card>
            <h1 className="font-bold my-2">Question {activeQuestionId + 1}</h1>
            <div className="text-container" dangerouslySetInnerHTML={{ __html: dataExams.questions[activeQuestionId]?.question }} />
            {dataExams.questions[activeQuestionId].options.map((itemAnswer, indexAnswer) => {
              const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
              return (
                <div className={`${dataExams.questions[activeQuestionId].options[indexAnswer].correct === 1 ? 'bg-blue-6 border-blue-1' : 'bg-white'} my-2  p-3 border rounded-lg`} key={indexAnswer}>
                  <div className='flex  gap-2'>
                    {dataExams.questions[activeQuestionId].answer_type === 'single' ? (
                      <div className="flex" >
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
                      <div className="flex" >
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
            <div className="md:flex flex-row gap-4 ">
              <div className="w-full mt-4">
                {activeQuestionId !== 0 && (
                  <button className={`text-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`} onClick={() => {
                    setActiveQuestionId(activeQuestionId - 1)
                  }} >Previous</button>
                )}
              </div>
              <div className="w-full mt-4">
                {dataExams.questions.length !== activeQuestionId + 1 && (
                  <button className={`text-white bg-blue-1 py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl`}
                    onClick={() => {
                      setActiveQuestionId(activeQuestionId + 1)
                    }}>Next</button>
                )}
              </div>
            </div>
          </Card>
        </div>
        <div className="md:w-1/2 lg:w-1/3 hidden lg:flex">
          <Card>
            <div className="bg-black-9 text-center p-2 rounded">
              Test Result
              <div className="text-blue-1 font-bold text-2xl">{data?.score}/{data?.quiz?.total_score}</div>
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
              <h1 className="font-bold my-2">{correctTotal} of &nbsp;
                {dataExams.questions.length} Question Answered</h1>
              <div className="flex flex-wrap gap-2">
                {dataExams.questions.map((item, index) => (
                  <div key={index} className={`
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
            <Link href="/student/quizzes">
              <a>
                <button className={`text-blue-1 bg-white py-2 px-4 border border-blue-1 w-full font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl mt-4`}>Back to List Quizzes</button>
              </a>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}

Index.layout = Layout
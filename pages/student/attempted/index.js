import CardAttempted from "../../../components/Cards/CardAttempted"
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";

export default function Index() {
  const [dataExamsAttempted, setDataExamsAttempted] = useState([])
  const [dataQuizAttempted, setDataQuizAttempted] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    const getDataExams = async () => {
      await apiStudentPage.examsAttemptedTake(8)
        .then((res) => {
          console.log(res.data.data)
          setDataExamsAttempted(res.data.data)
        })
    }
    const getQuiz = async () => {
      await apiStudentPage.QuizAttemptedAll(8)
        .then((res) => {
          setDataQuizAttempted(res.data.data)
          setIsLoading(false)
        })
    }
    getDataExams()
    getQuiz()
  }, [])
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      {/* <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" /> */}
      {dataExamsAttempted.length > 0 && (
        <div>
          <TitleButton title="Attempted Exam" url="/student/attempted/exams" />
          <Slider ArrowColor="blue" >
            {dataExamsAttempted.map((item, index) => (
              <CardAttempted type="exam" key={index} data={item.exam} isLive={true} url={`/student/exams/${item.exam.slug}`} score={`/student/exams/${item.exam.slug}/${item.id}`} />
            ))}
          </Slider>
        </div>
      )}
      {dataQuizAttempted.length > 0 && (
        <div className="mt-4">
          <TitleButton title="Attempted Quizzes" url="/student/attempted/quizzes" />
          <Slider ArrowColor="blue" >
            {dataQuizAttempted.map((item, index) => (
              <CardAttempted key={index} data={item.quiz} isLive={true}  url={`/student/exams/${item.quiz.slug}`} score={`/student/quizzes/${item.quiz.slug}/${item.id}`}/>
            ))}
          </Slider>
        </div>
      )}
      {!isLoading && dataExamsAttempted.length === 0 && dataQuizAttempted.length === 0 && (
        <div className="text-center">You not yet take test</div>
      )}
    </div>
  )
}


Index.layout = Layout
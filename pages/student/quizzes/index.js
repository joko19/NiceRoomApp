import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardQuizzes from '../../../components/Cards/CardQuizzes'
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [liveQuiz, setLiveQuiz] = useState([])
  const [QuizAll, setQuizAll] = useState([])

  useEffect(async () => {
    const getLive = async () => {
      await apiStudentPage.QuizLiveAll(8, '')
        .then((res) => {
          setLiveQuiz(res.data.data)
        })
    }
    const getAll = async () => {
      await apiStudentPage.QuizAll(8, '')
        .then((res) => {
          setQuizAll(res.data.data)
        })
    }
    getLive()
    getAll()
  }, [])
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      {/* <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" /> */}
      {liveQuiz.length > 4 && (
        <div>
          <TitleButton title="Live Quiz" url="#" />
          <Slider ArrowColor="blue" >
            {liveQuiz.map((item) => (
              <CardQuizzes type="exam" key={item} isLive={true} />
            ))}
          </Slider>
        </div>
      )}
      {QuizAll.length > 0 && (
        <>
          <p className="mt-4 font-bold text-xl">All Quiz</p>
          <div className="flex flex-wrap px-10">
            {QuizAll.map((item, index) => (
              <CardQuizzes key={index} data={item} url={`/student/quizzes/${item.slug}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}


Index.layout = Layout
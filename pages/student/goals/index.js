import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardExam from '../../../components/Cards/CardExams'
import CardQuizzes from "../../../components/Cards/CardQuizzes"
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";
import MainSlider from "../../../components/Slider/MainSlider"

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [dataPreferred, setDataPreferred] = useState([])
  const [liveExam, setLiveExam] = useState([])
  const [quiz, setQuiz] = useState([])
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    const getPreferred = async () => {
      await apiStudentPage.examsRecomendedTake(8)
        .then((res) => {
          setDataPreferred(res.data.data)
        })
    }
    const getLiveExam = async () => {
      await apiStudentPage.examsLiveTake(8)
        .then((res) => {
          setLiveExam(res.data.data)
          // setIsLoading(false)
        })
    }
    const getQuiz = async () => {
      await apiStudentPage.QuizAll(8, '')
        .then((res) => {
          setQuiz(res.data.data)
          // setIsLoading(false)
        })
    }
    const getNews = async () => {
      await apiStudentPage.examsLiveTake(8)
        .then((res) => {
          setNews(res.data.data)
          setIsLoading(false)
        })
    }
    getPreferred()
    getLiveExam()
    getQuiz()
    getNews()
  }, [])
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      {/* <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" /> */}
      {dataPreferred.length > 0 && (
        <MainSlider title="Your Preferred Exams" data={dataPreferred} urlSeeAll="/student/exams/preferred" type="exams" />
      )}
      {liveExam.length > 0 && (
        <MainSlider title="Live Exams" isLive={true} data={liveExam} urlSeeAll="/student/exams/live" type="exams" />
      )}
      {quiz.length > 0 && (
        <div className="mt-4">
          <TitleButton title="Quizzes" url="/student/quizzes" />
          <Slider ArrowColor="blue" count={list.length} >
            {quiz.map((item, index) => (
              <CardQuizzes key={index} data={item} url={`/student/quizzes/${item.slug}`} />
            ))}
          </Slider>
        </div>
      )}
      {!isLoading && (dataPreferred.length === 0 && liveExam.length === 0 && quiz.length === 0 && news.length === 0) && (
        <div className="text-center">Goals is Empty</div>
      )}
    </div>
  )
}


Index.layout = Layout
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardExam from '../../../components/Cards/CardExams'
import CardQuizzes from "../../../components/Cards/CardQuizzes"
import { CardNews2 } from '../../../components/Cards/CardNews'
import dynamic from 'next/dynamic';
import Image from "next/image"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useEffect, useState } from 'react'
import apiStudentPage from "../../../action/student_page"

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [examPrevious, setExamPrevious] = useState({})
  const [recommended, setRecommended] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [quiz, setQuiz] = useState([])
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewGraph, setViewGraph] = useState(false)
  const [dataChart, setDataChart] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022',]
      }
    },
    series: [
      {
        name: "series-1",
        data: [50, 62, 87, 80, 80, 62, 92, 42, 50, 62, 80, 80, 80, 62, 92, 42, 50, 62, 87, 80, 80, 62, 92, 42,]
      }
    ]
  })

  useEffect(() => {
    const getExamPrevious = async () => {
      await apiStudentPage.examsPrevious()
        .then((res) => {
          console.log(res.data)
          setExamPrevious(res.data.data)
        })

    }
    const getDataGraph = async () => {
      await apiStudentPage.examsGraph()
        .then((res) => {
          if (res.data.data.length > 4) {
            setViewGraph(true)
          }
          const date = []
          const score = []
          res.data.data.map((item) => {
            date.push(item.created_at)
            score.push(item.score)
          })
          const data = {
            options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: date
              }
            },
            series: [
              {
                name: "series-1",
                data: score
              }
            ]
          }
          setDataChart(data)
        })
    }
    const getRecommended = async () => {
      await apiStudentPage.examsRecomendedAll(8)
        .then((res) => {
          setRecommended(res.data.data)
          // setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getUpcoming = async () => {
      await apiStudentPage.examsUpcomingTake()
        .then((res) => {
          setUpcoming(res.data.data)
          // setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getQuiz = async () => {
      await apiStudentPage.QuizLiveAll(8, '')
        .then((res) => {
          setQuiz(res.data.data)
          // setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getNews = async () => {
      await apiStudentPage.indexNews()
        .then((res) => {
          setNews(res.data.data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getExamPrevious()
    getDataGraph()
    getRecommended()
    getUpcoming()
    getQuiz()
    getNews()
  }, [])

  return (
    <div className="mt-12 min-w-full overflow-x-hidden">

      <div className="flex flex-wrap">

        {viewGraph && (
          <div className="md:w-2/3 w-full p-4">
            <h1 className="font-bold text-xl">Graph Performance</h1>
            <Chart
              options={dataChart?.options}
              series={dataChart?.series}
              type="bar"
              height={360}
            />
          </div>
        )}

        {examPrevious?.exam?.name && (<div className="md:w-1/3 w-full bg-white p-4 rounded-lg">
          <h1 className="font-bold text-xl">{examPrevious?.exam?.name}</h1>
          <div className="flex justify-between mt-4">
            <div className="text-black-4">Duration</div>
            <div className="text-black-3">{examPrevious?.exam?.duration} mins</div>
          </div>
          <div className="flex justify-between">
            <div className="text-black-4">Number of Section</div>
            <div className="text-black-3">{examPrevious?.exam?.total_section} Section</div>
          </div>
          <div className="flex mt-4">
            <div className="w-full">
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_correct.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Correct</p>
                  <p className="font-bold">{examPrevious?.correct}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_incorrect.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Incorrecy</p>
                  <p className="font-bold">{examPrevious?.incorrect}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_score.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Score</p>
                  <p className="font-bold">{examPrevious?.score}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_accuracy.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Accuracy</p>
                  <p className="font-bold">{examPrevious?.accuracy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
      {recommended.length > 0 && (
        <div>
          <TitleButton title="Recomended Exam" url="/student/exams/recommended" />
          <Slider ArrowColor="blue" count={recommended.length} >
            {recommended.map((item, index) => (
              <CardExam type="exam" key={index} data={item} />
            ))}
          </Slider>
        </div>
      )}
      {upcoming.length > 0 && (
        <div className="mt-4">
          <TitleButton title="Upcoming Exam" url="/student/exams/upcoming" />
          <Slider ArrowColor="blue" count={upcoming.length}>
            {upcoming.map((item, index) => (
              <CardExam type="exam" key={index} data={item} />
            ))}
          </Slider>
        </div>
      )}
      {quiz.length > 0 && (
        <div className="mt-4">
          <TitleButton title="Live Quiz" isLive={true} url="/student/quizzes/live" />
          <Slider ArrowColor="blue" count={quiz.length} >
            {quiz.map((item, index) => (
              <CardQuizzes key={index} data={item} />
            ))}
          </Slider>
        </div>
      )}
      {news.length > 0 && (
        <div className="mt-4">
          <TitleButton title="News" url="/student/news" />
          <Slider ArrowColor="blue" count={news.length} >
            {news.map((item, index) => (
              <CardNews2 key={index} data={item} />
            ))}
          </Slider>
        </div>
      )}
      {!isLoading && (!viewGraph && recommended.length === 0 && upcoming.length === 0 && quiz.length === 0 && news.length === 0) && (
        <div className="text-center">
          Nothing Data
        </div>
      )}
    </div>
  )
}


Index.layout = Layout
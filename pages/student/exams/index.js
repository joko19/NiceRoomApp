import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardExams from '../../../components/Cards/CardExams'
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";

export default function Index() {
  const [live, setLive] = useState([])
  const [recommended, setRecomended] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.examsLiveTake(8)
        .then((res) => {
          setLive(res.data.data)
        })
    }
    const getRecomended = async () => {
      await apiStudentPage.examsRecomendedTake(8)
        .then((res) => {
          setRecomended(res.data.data)
          setIsLoading(false)
        })
    }
    getData()
    getRecomended()
  }, [])

  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      {(live.length > 0 || recommended.length > 0) && (
        <>
          {/* <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" /> */}
          {live.length > 0 && (
            <div className="">
              <TitleButton title="Live Exam" url="/student/exams/live" />
              <Slider ArrowColor="blue" count={live.length} >
                {live.map((item, index) => {
                  return (
                    <CardExams key={index} isLive={true} data={item} url={`/student/exams/${item.slug}`} />
                  )
                })}
              </Slider>
            </div>
          )}
          {recommended.length > 0 && (
            <div className="mt-4">
              <TitleButton title="Recomended Exam" url="/student/exams/recommended" />
              <div className="flex flex-wrap ">
                {recommended.map((item, index) => (
                  <CardExams key={index} data={item} url={`/student/exams/${item.slug}`} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {isLoading === false && (live.length === 0 && recommended.length === 0) && (
        <div className="text-center">Nothing Exams</div>
      )}
    </div>
  )
}

Index.layout = Layout
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardExams from '../../../components/Cards/CardExams'
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";

export default function Index() {
  const [liveAll, setLiveAll] = useState([])
  const [liveTake, setLiveTake] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.examsLiveAll()
        .then((res) => {
          setLiveAll(res.data.data)
        })
    }
    const getLive = async () => {
      await apiStudentPage.examsLiveTake(8)
        .then((res) => {
          setLiveTake(res.data.data)
          setIsLoading(false)
        })
    }
    getData()
    getLive()
  }, [])
  
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      {(liveTake.length > 0|| liveAll.length > 0) && (
        <>
          <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" />
          <div>
            <TitleButton title="Live Exam" url="#" />
            <Slider ArrowColor="blue" >
              {liveTake.map((item, index) => {
                return (
                  <CardExams key={index} isLive={true} data={item} url={`/student/exams/${item.slug}`} />
                )
              })}
            </Slider>
          </div>
          <p className="mt-4 font-bold text-xl">All Exam</p>
          <div className="flex flex-wrap px-10">
            {liveAll.map((item, index) => (
              <CardExams key={index} data={item} url={`/student/exams/${item.slug}`} />
            ))}
          </div>
        </>
      )}
      {isLoading === false && (liveAll.length === 0 && liveTake.length === 0) && (
        <div className="text-center">Nothing Exams</div>
      )}
    </div>
  )
}

Index.layout = Layout
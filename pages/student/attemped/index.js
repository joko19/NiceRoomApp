import CardAttempted from "../../../components/Cards/CardAttempted"
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [dataExamsAttempted, setDataExamsAttempted] = useState([])
  const [dataQuizAttempted, setDataQuizAttempted] = useState([])

  useEffect(async () => {
    const getDataExams = async () => {
      await apiStudentPage.examsAttemptedTake(8)
        .then((res) => {
          setDataExamsAttempted(res.data.data)
        })
    }
    getDataExams()
  }, [])
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" />
      <div>
        <TitleButton title="Attempted Exam" url="#" />
        <Slider ArrowColor="blue" >
          {dataExamsAttempted.map((item, index) => (
            <CardAttempted type="exam" key={index} data={item.exam} isLive={true} />
          ))}
        </Slider>
      </div>
      <div className="mt-4">
        <TitleButton title="Attempted Quizzes" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardAttempted key={item} isLive={true} />
          ))}
        </Slider>
      </div>

    </div>
  )
}


Index.layout = Layout
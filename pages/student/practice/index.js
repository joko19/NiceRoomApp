import CardPractice from "../../../components/Cards/CardPractice"
import Layout from "../../../Layout/Layout"
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";

export default function Index() {
  const [practiceData, setPracticeData] = useState([])

  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.practiceAll()
        .then((res) => {
          setPracticeData(res.data.data)
        })
    }
    getData()
  }, [])

  return (
    <div className="mt-12">
      {practiceData.length > 0 ? (
        <>
          <p className="font-bold text-xl">Practice Test </p>
          <div className="flex flex-wrap">
            {practiceData.map((item) => (
              <CardPractice key={item} />
            ))}
          </div>
        </>
      ):(
        <div className="text-center">
          Nothing Practice Test
        </div>
      )}
    </div>
  )
}


Index.layout = Layout
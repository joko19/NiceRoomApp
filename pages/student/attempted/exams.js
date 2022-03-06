import Layout from "../../../Layout/Layout"
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";
import CardAttempted from "../../../components/Cards/CardAttempted";

export default function Index() {
  const [data, setData] = useState([])
  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.examsAttemptedAll()
        .then((res) => {
          console.log(res.data.data)
          setData(res.data.data)
        })
    }
    getData()
  }, [])

  return (
    <div className="mt-12">
      {data.length > 0 && (
        <>
          <p className="font-bold text-xl">Attempted Exams</p>
          <div className="flex flex-wrap">
            {data.map((item, index) => (
              <CardAttempted key={index} data={item.exam} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}


Index.layout = Layout
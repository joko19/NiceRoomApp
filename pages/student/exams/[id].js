import Layout from "../../../Layout/Layout"
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";
import Card from '../../../components/Cards/Card'
import Image from "next/image"
import GeneralInstruction from "../../../components/Section/generalInstruction"

export default function Index() {
  const [dataExams, setDataExams] = useState()
  useEffect(async () => {
    const getData = async () => {
      await apiStudentPage.showExams(5)
        .then((res) => {
          console.log(res.data.data)
          setDataExams(res.data.data)
        })
    }
    getData()
  }, [])
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <Card>
        <GeneralInstruction />
      </Card>
    </div>
  )
}


Index.layout = Layout
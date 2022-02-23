import Layout from "../../../Layout/Layout"
import CardNews from "../../../components/Cards/CardNews"
import apiStudentPage from "../../../action/student_page"
import { useEffect, useState } from 'react'

export default function Index() {
  const [dataNews, setDataNews] = useState([])
  useEffect(() => {
    const getData = async () => {
      await apiStudentPage.indexNews()
        .then((res) => {
          setDataNews(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getData()
  }, [])

  return (
    <div className="mt-12 ">
      <h1 className="text-xl font-bold mb-4">All News</h1>
      {dataNews.map((item) => (
        <CardNews key={item} dataNews={item} />
      ))}
    </div>
  )
}

Index.layout = Layout
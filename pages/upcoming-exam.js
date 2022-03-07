import Link from "next/link";
import Footer from "../components/footer/footer"
import Header from '../components/Navbar/header';
import { FaAngleRight } from 'react-icons/fa'
import CardExams from "../components/Cards/CardExams";
import { useState, useEffect } from 'react'
import apiLanding from "../action/landingPage";

function UpcomingExam() {
  const [dataUpcoming, setDataUpcoming] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const getUpcoming = async () => {
      await apiLanding.ExamsUpcoming('', '')
        .then((res) => {
          console.log(res.data.data)
          setDataUpcoming(res.data.data)
          if (res.data.data.length === 0) {
            setIsEmpty(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getUpcoming()
  }, [])
  return (
    <>
      <Header />
      <div className=" bg-black-8 pt-20 px-4" >
        <div className="py-4 md:mx-32">
          <div className='flex gap-1'>
            <Link href="/landing">
              <a className='mb-4 text-black-5'>Home</a>
            </Link>
            <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Upcoming Exam</span>
          </div>
          <div className="py-4">
            <div className="flex gap-4 align-text-bottom">
              <h1 className="text-2xl">Upcoming Exams</h1>
            </div>
            <div className=" flex mx-auto flex-wrap gap-4 my-4">
              {dataUpcoming.map((item, index) => (
                <CardExams key={index} data={item} />
              ))}
            </div>
            {isEmpty && (
              <div>Nothing Upcoming Exams</div>
            )}
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

export default UpcomingExam
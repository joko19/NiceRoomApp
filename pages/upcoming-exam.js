import Link from "next/link";
import Footer from "../components/footer/footer"
import Header from '../components/Navbar/header';
import { FaAngleRight } from 'react-icons/fa'
import Button from "../components/Button/button";
import CardExams from "../components/Cards/CardExams";

function UpcomingExam() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />
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
          <div className=" flex flex-wrap gap-4 my-4">
            {list.map((item) => (
              <CardExams key={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default UpcomingExam
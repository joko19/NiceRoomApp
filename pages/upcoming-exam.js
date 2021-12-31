import Link from "next/link";
import Footer from "../components/footer/footer"
import Header from '../components/Navbar/header';
import { FaAngleRight } from 'react-icons/fa'

function UpcomingExam() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />
      <div className="py-4 md:mx-32 my-16">
        <div className='flex gap-1'>
          <Link href="/landing">
            <a className='mb-12 text-black-5'>Home</a>
          </Link>
          <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Upcoming Exam</span>
        </div>
        <div className="py-4">
          <div className="flex gap-4 align-text-bottom">
            <h1 className="text-3xl">Upcoming Exams</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
          </div>
          <div className=" grid md:grid-cols-3 gap-4 my-4">
            {list.map((item) => (
              <div key={item} className="bg-white rounded-lg p-6">
                <div className="flex flex-row gap-4">
                  <img className='w-12 h-12' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
                  <div>
                    <p className="font-bold self-center">The Hindu Vocab Exam</p>
                    <p className="text-black-3 text-sm">By <span className='text-blue-1'>Student University</span> Engineering</p>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex gap-2 text-black-3 gap-4">
                    <img className='w-5 h-5' src="/asset/icon/ic_clock.png" alt="icon paper" />
                    <span>120 mins duration </span>
                  </div>
                  <div className="flex gap-2 text-black-3 gap-4">
                    <img className='w-5 h-5' src="/asset/icon/ic_signal.png" alt="icon paper" />
                    <span>3 Section</span>
                  </div>
                  <div className="flex gap-2 text-black-3 gap-4">
                    <img className='w-5 h-5' src="/asset/icon/ic_date.png" alt="icon paper" />
                    <span>12 Jan ~ 20 Feb 2020</span>
                  </div>
                </div>
                <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Exam</button>
                <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default UpcomingExam
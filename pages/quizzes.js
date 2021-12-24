import Link from 'next/link';
import Header from '../components/Navbar/header';
import Footer from "../components/footer/footer";
import { FaAngleRight } from 'react-icons/fa';

function Quizzes() {
  const list = [1, 2, 3, 4]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />

      <div className="py-4 md:mx-32 mt-16">
        <div className='flex gap-1'>
          <Link href="/landing">
            <a className='mb-12 text-black-5'>Home</a>
          </Link>
          <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Quizzes</span>
        </div>
        <div className="flex gap-4 align-text-bottom">
          <img className="w-10 h-10" src="/asset/icon/ic_live_transparent.png" alt="icon live" />
          <h1 className="text-3xl">Live Quiz</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-4 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6">
              <div className="flex flex-row gap-4">
                <div className='bg-yellow-1 p-2 rounded-full inline-block p-4'>
                  <img className='w-4 h-4' src="/asset/icon/ic_ball_white.png" alt="icon paper" />
                </div>
                <div>
                  <p className="font-bold self-center">Hindu Vocab Exa</p>
                  <p className="text-black-3">Vocabs Topic</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-black-3">
                  <p>Duration</p>
                  <p>Date</p>
                </div>
                <div className="text-right text-black-5">
                  <p>60 mins</p>
                  <p>27 June 2021</p>
                </div>
              </div>
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Quiz</button>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 md:mx-32">
        <div className="flex gap-8 align-text-bottom">
          <h1 className="text-3xl">PO, CLERK, SO, Insurance</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-4 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6">
              <div className="flex flex-row gap-4">
                <div className='bg-yellow-1 p-2 rounded-full inline-block p-4'>
                  <img className='w-4 h-4' src="/asset/icon/ic_ball_white.png" alt="icon paper" />
                </div>
                <div>
                  <p className="font-bold self-center">Hindu Vocab Exam</p>
                  <p className="text-black-3">Vocabs Topic</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-black-3">
                  <p>Duration</p>
                  <p>Date</p>
                </div>
                <div className="text-right text-black-5">
                  <p>60 mins</p>
                  <p>27 June 2021</p>
                </div>
              </div>
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Quiz</button>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 md:mx-32 mb-20">
        <div className="flex gap-8 align-text-bottom">
          <h1 className="text-3xl">IAS</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-4 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6">
              <div className="flex flex-row gap-4">
                <div className='bg-yellow-1 p-2 rounded-full inline-block p-4'>
                  <img className='w-4 h-4' src="/asset/icon/ic_ball_white.png" alt="icon paper" />
                </div>
                <div>
                  <p className="font-bold self-center">Hindu Vocab Exam</p>
                  <p className="text-black-3">Vocabs Topic</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-black-3">
                  <p>Duration</p>
                  <p>Date</p>
                </div>
                <div className="text-right text-black-5">
                  <p>60 mins</p>
                  <p>27 June 2021</p>
                </div>
              </div>
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Quiz</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default Quizzes
import Link from 'next/link';
import Header from '../../components/Navbar/header';
import Footer from "../../components/footer/footer";
import { FaAngleRight } from 'react-icons/fa';
import Slider from '../../components/Slider/Slider';
import CardQuizzes from '../../components/Cards/CardQuizzes';
import { TitleButton } from '../../components/Slider/TitleButton';
import apiLanding from '../../action/landingPage';
import { useState, useEffect } from 'react'

function Quizzes() {
  const list = [1, 2, 3, 4, 5, 6, 7]
  const [dataQuiz, setDataQuiz] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const getUpcoming = async () => {
      await apiLanding.quizLive(4)
        .then((res) => {
          console.log(res.data.data)
          setDataQuiz(res.data.data)
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
      <div className=" bg-black-8 pt-20 px-4 min-h-screen" >
        <div className="py-4 md:mx-32">
          <div className='flex gap-1'>
            <Link href="/landing">
              <a className='mb-8 text-black-5'>Home</a>
            </Link>
            <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Quizzes</span>
          </div>
          {dataQuiz.length > 0 && (
            <>
              <TitleButton title="Live Quiz" url="/quizzes/1" isLive={true} count={dataQuiz.length} />
              <Slider ArrowColor="blue" >
                {dataQuiz.map((item) => (
                  <CardQuizzes key={item} isLive={true} />
                ))}
              </Slider>
            </>
          )}
        </div>

        {/* <div className="py-4 md:mx-32">
          <TitleButton title="PO, CLERK, SO, Insurance" url="/quizzes/1" />
          <Slider ArrowColor="blue" >
            {list.map((item) => (
              <CardQuizzes key={item} />
            ))}
          </Slider>
        </div>

        <div className="py-4 md:mx-32 ">
          <TitleButton title="IAS" url="/quizzes/1" />
          <Slider ArrowColor="blue" >
            {list.map((item) => (
              <CardQuizzes key={item} />
            ))}
          </Slider>
        </div> */}
      </div >
      {isEmpty && (
        <div>Nothing Quiz</div>
      )}
      <Footer />
    </>
  )
}

export default Quizzes
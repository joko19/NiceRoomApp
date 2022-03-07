import Link from 'next/link';
import Header from '../../components/Navbar/header';
import Footer from "../../components/footer/footer";
import { FaAngleRight } from 'react-icons/fa';
import Slider from '../../components/Slider/Slider';
import CardExams from '../../components/Cards/CardExams';
import { TitleButton } from '../../components/Slider/TitleButton';
import apiLanding from '../../action/landingPage';
import { useState, useEffect } from 'react'

function Exam() {
  const list = [1, 2, 3, 4, 5, 6, 7]
  const [dataLive, setDataLive] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const getUpcoming = async () => {
      await apiLanding.ExamsLive(4, '')
        .then((res) => {
          console.log(res.data.data)
          setDataLive(res.data.data)
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
              <a className='mb-8  text-black-5'>Home</a>
            </Link>
            <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Exam</span>
          </div>

          <TitleButton title="Live Exams" url="/exam/1" isLive={true} count={dataLive.length} />
          <Slider ArrowColor="blue" count={dataLive.length} >
            {dataLive.map((item, index) => (
              <CardExams key={index} isLive={true} data={item} />
            ))}
          </Slider>
        </div>

        {/* <div className="py-4 md:mx-32">
          <TitleButton title="PO, CLERK, SO, Insurance" url="/exam/1" />
          <Slider ArrowColor="blue">
            {list.map((item) => (
              <CardExams key={item} />
            ))}
          </Slider>
        </div> */}

        {/* <div className="py-4 md:mx-32">
          <TitleButton title="IAS" url="/exam/1" />
          <Slider ArrowColor="blue">
            {list.map((item) => (
              <CardExams key={item} />
            ))}
          </Slider>
        </div> */}
      </div >
      <Footer />
    </>
  )
}

export default Exam
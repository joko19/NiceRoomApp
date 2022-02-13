import Link from 'next/link';
import Header from '../../components/Navbar/header';
import Footer from "../../components/footer/footer";
import { FaAngleRight } from 'react-icons/fa';
import Slider from '../../components/Slider/Slider';
import CardExams from '../../components/Cards/CardExams';
import { TitleButton } from '../../components/Slider/TitleButton';

function Exam() {
  const list = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />
      <div className="py-4 md:mx-32 ">
        <div className='flex gap-1'>
          <Link href="/landing">
            <a className='mb-8  text-black-5'>Home</a>
          </Link>
          <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Exam</span>
        </div>
        
        <TitleButton title="Live Exams" url="/exam/1" isLive={true} />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardExams key={item} isLive={true} />
          ))}
        </Slider>
      </div>

      <div className="py-4 md:mx-32">
        <TitleButton title="PO, CLERK, SO, Insurance" url="/exam/1" />
        <Slider ArrowColor="blue">
          {list.map((item) => (
            <CardExams key={item} />
          ))}
        </Slider>
      </div>

      <div className="py-4 md:mx-32 mb-20">
        <TitleButton title="IAS" url="/exam/1" />
        <Slider ArrowColor="blue">
          {list.map((item) => (
            <CardExams key={item} />
          ))}
        </Slider>
      </div>

      <Footer />
    </div >
  )
}

export default Exam
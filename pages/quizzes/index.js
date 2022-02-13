import Link from 'next/link';
import Header from '../../components/Navbar/header';
import Footer from "../../components/footer/footer";
import { FaAngleRight } from 'react-icons/fa';
import Button from '../../components/Button/button';
import Slider from '../../components/Slider/Slider';
import CardQuizzes from '../../components/Cards/CardQuizzes';
import { TitleButton } from '../../components/Slider/TitleButton';


function Quizzes() {
  const list = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />
      <div className="py-4 md:mx-32">
        <div className='flex gap-1'>
          <Link href="/landing">
            <a className='mb-8 text-black-5'>Home</a>
          </Link>
          <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Quizzes</span>
        </div>
        <TitleButton title="Live Quiz" url="/quizzes/1" isLive={true} />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardQuizzes key={item} isLive={true} />
          ))}
        </Slider>
      </div>

      <div className="py-4 md:mx-32">
        <TitleButton title="PO, CLERK, SO, Insurance" url="/quizzes/1" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardQuizzes key={item} />
          ))}
        </Slider>
      </div>

      <div className="py-4 md:mx-32 mb-20">
        <TitleButton title="IAS" url="/quizzes/1" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardQuizzes key={item} />
          ))}
        </Slider>
      </div>
      <Footer />
    </div >
  )
}

export default Quizzes
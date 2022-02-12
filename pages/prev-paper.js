import Link from 'next/link';
import Header from '../components/Navbar/header';
import Footer from "../components/footer/footer";
import { FaAngleRight } from 'react-icons/fa';
import Slider from '../components/Slider/Slider';
import CardPaper from '../components/Cards/CardPaper';
import { TitleButton } from '../components/Slider/TitleButton';

function PrevPaper() {

  const list = [1, 2, 3, 4, 5, 6]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />
      <div className="py-4 md:mx-32">
        <div className='flex gap-1'>
          <Link href="/landing">
            <a className='mb-8 text-black-5'>Home</a>
          </Link>
          <FaAngleRight className='mt-1' /> <span className='text-blue-1'>Prev Paper</span>
        </div>

        <TitleButton title="PO, CLERK, SO, Insurance" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardPaper key={item} />
          ))}
        </Slider>
      </div>

      <div className="py-4 md:mx-32">
        <TitleButton title="IAS" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardPaper key={item} />
          ))}
        </Slider>
      </div>

      <div className="py-4 md:mx-32 mb-20">
        <TitleButton title="CAT, MBA" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardPaper key={item} />
          ))}
        </Slider>
      </div>
      <Footer />
    </div >
  )
}

export default PrevPaper
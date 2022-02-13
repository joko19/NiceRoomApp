import Link from "next/link";
import Footer from "../../components/footer/footer"
import Header from '../../components/Navbar/header';
import { FaAngleRight } from 'react-icons/fa'
import CardPaper from "../../components/Cards/CardPaper";

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
          <FaAngleRight className='mt-1' />
          <span className='text-blue-1'>Prev Paper</span>
          <FaAngleRight className='mt-1' />
          <span className='text-blue-1'>PO, CLERK, SO, Insurance</span>
        </div>
        <div className="py-4">
          <div className="flex gap-4 align-text-bottom">
            <h1 className="text-2xl">PO, CLERK, SO, Insurance</h1>
          </div>
          <div className=" grid md:grid-cols-3 gap-4 my-4">
            {list.map((item) => (
              <CardPaper key={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default UpcomingExam
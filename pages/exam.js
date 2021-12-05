import Header from "../components/header/header"
import { useRouter } from 'next/router';

function Exam() {
  const { pathname } = useRouter();
  return (
    <>
      <Header path={pathname}/>
      <div className="m-24 font-bold text-5xl">
        Page Exam
      </div>
    </>
  )
}

export default Exam
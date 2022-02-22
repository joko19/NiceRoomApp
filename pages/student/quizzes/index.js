import CardAttempted from "../../../components/Cards/CardAttempted"
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardQuizzes from '../../../components/Cards/CardQuizzes'

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" />
      <div>
        <TitleButton title="Live Quiz" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardQuizzes type="exam" key={item} isLive={true} />
          ))}
        </Slider>
      </div>
      <p className="mt-4 font-bold text-xl">All Quiz</p>
      <div className="flex flex-wrap px-10">
      {list.map((item) => (
        <CardQuizzes key={item} url={`/student/quizzes/${item}`}  />
      ))}
      </div>
    </div>
  )
}


Index.layout = Layout
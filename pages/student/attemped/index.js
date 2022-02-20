import CardAttempted from "../../../components/Cards/CardAttempted"
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" />
      <div>
        <TitleButton title="Attempted Exam" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardAttempted type="exam" key={item} isLive={true} />
          ))}
        </Slider>
      </div>
      <div className="mt-4">
        <TitleButton title="Attempted Quizzes" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardAttempted key={item} isLive={true} />
          ))}
        </Slider>
      </div>

    </div>
  )
}


Index.layout = Layout
import { TitleButton } from "../../../components/Slider/TitleButton"
import Layout from "../../../Layout/Layout"
import Slider from '../../../components/Slider/Slider'
import CardExam from '../../../components/Cards/CardExams'
import CardQuizzes from "../../../components/Cards/CardQuizzes"
import {CardNews2} from '../../../components/Cards/CardNews'
import dynamic from 'next/dynamic';
import Image from "next/image"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useEffect, useState } from 'react'

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [dataChart, setData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022',]
      }
    },
    series: [
      {
        name: "series-1",
        data: [50, 62, 87, 80, 80, 62, 92, 42, 50, 62, 80, 80, 80, 62, 92, 42, 50, 62, 87, 80, 80, 62, 92, 42,]
      }
    ]
  })
  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <h1 className="font-bold text-xl">Graph Performance</h1>
      <div className="flex flex-wrap">
        <div className="md:w-2/3 w-full p-4">
          <Chart
            options={dataChart.options}
            series={dataChart.series}
            type="bar"
            height={360}
          />
        </div>
        <div className="md:w-1/3 w-full bg-white p-4 rounded-lg">
          <h1 className="font-bold text-xl">Previous Exam</h1>
          <p>Rajashtan Police Exam</p>
          <div className="flex justify-between mt-4">
            <div className="text-black-4">Duration</div>
            <div className="text-black-3">120 mins</div>
          </div>
          <div className="flex justify-between">
            <div className="text-black-4">Number of Section</div>
            <div className="text-black-3">3 Section</div>
          </div>
          <div className="flex mt-4">
            <div className="w-full">
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_correct.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Correcy</p>
                  <p className="font-bold">8</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_incorrect.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Incorrecy</p>
                  <p className="font-bold">2</p>
                </div>
              </div>
            </div>
            <div className="w-full">
            <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_score.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Score</p>
                  <p className="font-bold">8</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image src="/asset/icon/table/ic_accuracy.svg" height={24} width={24} alt="icon correct" />
                <div>
                  <p className="text-black-4">Accuracy</p>
                  <p className="font-bold">2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TitleButton title="Recomended Exam" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardExam type="exam" key={item} />
          ))}
        </Slider>
      </div>
      <div className="mt-4">
        <TitleButton title="Upcoming Exam" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardExam type="exam" key={item} />
          ))}
        </Slider>
      </div>
      <div className="mt-4">
        <TitleButton title="Live Quiz" isLive={true} url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardQuizzes key={item} />
          ))}
        </Slider>
      </div>
      <div className="mt-4">
        <TitleButton title="News" url="#" />
        <Slider ArrowColor="blue" >
          {list.map((item) => (
            <CardNews2 key={item} />
          ))}
        </Slider>
      </div>
    </div>
  )
}


Index.layout = Layout
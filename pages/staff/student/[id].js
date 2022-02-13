import Layout from "../../../Layout/Layout";
import { useEffect, useState } from 'react'
import {
  Select
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import apiStudent from "../../../action/student";
import Card from "../../../components/Cards/Card";
import { BackButton } from "../../../components/Button/button";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Section({ data }) {
  const Router = useRouter()
  const { id } = Router.query
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [dataStudent, setDataStudent] = useState({
    enrollments: [{
      branch: {}
    }]
  })
  const [dataChart, setData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022', '02/07/2022']
      }
    },
    series: [
      {
        name: "series-1",
        data: [50, 62, 87, 100, 62, 92, 42, 75, 92]
      }
    ]
  })

  const getDetail = async () => {
    await apiStudent.detail(id)
      .then((result) => {
        setDataStudent(result.data.data)
        if (result.data.data.avatar !== null) {
          setAvatar(result.data.data.avatar)
        }
      })

  }


  useEffect(() => {
    getDetail()
  }, [])




  return (
    <div className="mt-12">
      <div className="text-sm">
        <BackButton url="/staff/student" />
      </div>
      <Card>
        <div className="flex gap-4">
          <div className="flex">
            <div className=" relative">

              <img className="rounded-full w-12 h-12 object-cover" src={avatar} alt="photo profile" height={120} width={120} />
            </div>
          </div>
          <div className="flex gap-12">
            <div className="my-auto">
              <p className="font-bold">{dataStudent.name}</p>
              <p>{dataStudent.email}</p>
            </div>
            <div className="my-auto">
              <p className="font-bold">Phone</p>
              <p>{dataStudent.phone}</p>
            </div>
            <div className="my-auto">
              <p className="font-bold">Branch</p>
              <p>{dataStudent.enrollments[0].branch?.name}</p>
            </div>
          </div>
        </div>
        <p className="my-4 font-bold text-xl">Graph Performance</p>

        <div className="flex gap-4 w-1/2 h-full  ">
          <Select placeholder='All Test' className="h-full" size="md">
            <option value='live'>Test 1</option>
            <option value='mixed'>Test 2</option>
          </Select>
          <Select placeholder='All Date' className="h-full" size="md" >
          </Select>
        </div>
        <Chart
          options={dataChart.options}
          series={dataChart.series}
          type="bar"
        />
      </Card>
    </div>
  )
}


// This also gets called at build time
export async function getServerSideProps(context) {
  return { props: {} }
}

Section.layout = Layout
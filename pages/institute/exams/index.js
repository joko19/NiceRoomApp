import Layout from "../../../Layout/Layout";
import Card from "../../../components/Cards/Card";
import { useEffect, useState } from 'react'
import Image from "next/image";
import {
  useDisclosure,
} from '@chakra-ui/react'
import Pagination from "../../../components/Pagination/pagination";
import { Select } from '@chakra-ui/react'
import apiExam from "../../../action/exam";
import Link from "next/link";
import Button from "../../../components/Button/button";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import ExamPracticeTable from "../../../components/Table/ExamsPracticeTable";

export default function Index() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [dataInstitute, setDataInstitute] = useState([])
  const [list, setList] = useState([])
  const TableHead = ['Exam Name', 'Type', 'Date', 'Status', 'Action']

  const getData = async (search, type, status, limit, page) => {
    await apiExam.index(search, type, status, limit, page)
      .then((res) => {
        console.log(res.data.data)
        setDataInstitute(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        // console.log(err)
      })
  }
  useEffect(() => {
    getData(search, type, status, limit, page)
  }, [])


  const onDelete = async (id) => {
    await apiExam.deleted(id)
      .then(() => {
        getData(search, type, status, limit, page)
      })
      .catch((err) => {
        // console.log(err)
      })
  }
// 
  return (
    <div className="mt-12">
      <Card
        title="Exams"
        right={(
          <Link href="/institute/exams/create">
            <a >
              <Button title="+ Create Exam" />
            </a>
          </Link>
        )}
      >
        <div className="flex gap-4 mb-4">
          <input type="text" className=" border rounded w-1/2 p-2 text-sm" value={search} placeholder="Search Exam" onChange={(e) => {
            setSearch(e.target.value)
            getData(e.target.value, type, status, limit, page)
          }} />

          <div className="flex gap-4 w-1/2 h-full  ">
            <Select placeholder='All Type' className="h-full" size="md" onChange={(e) => {
              setType(e.target.value)
              getData(search, e.target.value, status, limit, page)
            }}>
              <option value='live'>Live</option>
              <option value='mixed'>Mixed</option>
            </Select>
            <Select placeholder='All Status' className="h-full" size="md" onChange={(e) => {
              setStatus(e.target.value)
              getData(search, type, e.target.value, limit, page)
            }}>
              <option value='published'>Published</option>
              <option value='draft'>Draft</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <ExamPracticeTable TableHead={TableHead} list={list} onOpen={onOpen} setSelectedData={(id) => setSelectedData(id)} type="exams"/>
              </div>
              <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} type={type} status={status} total={dataInstitute.total} doLimit={data => setLimit(data)} doData={getData} />
            </div>
          </div>
        </div>
      </Card>
      <ModalDelete isOpen={isOpen} onClose={onClose} onDelete={(data) => onDelete(data)} selectedData={selectedData} />
    </div>
  )
}
Index.layout = Layout
import Layout from "../../../Layout/Layout";
import Card from "../../../components/Cards/Card";
import { useEffect, useState } from 'react'
import {
  useDisclosure,
  Select
} from '@chakra-ui/react'
import Pagination from "../../../components/Pagination/pagination";
import apiExam from "../../../action/exam";
import Link from "next/link";
import Button from "../../../components/Button/button";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import ExamPracticeTable from "../../../components/Table/ExamsPracticeTable";
import { ModalUnPublish } from "../../../components/Modal/ModalUnpublish";

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

  const TableHead = ['Exam Name', 'Type', 'Date', 'Total Question', 'Status', 'Action']
  const {
    isOpen: isConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal
  } = useDisclosure()

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

  const onUnpublish = async (id) => {
    await apiExam.unpublish(id)
      .then(() => {
        getData(search, type, status, limit, page)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  return (
    <div className="mt-12">
      <Card
        title="Exams"
        right={(
          <Link href="/institute/exams/create">
            <a>
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
            <div className="w-full rounded py-2 pl-2 border">
              <Select placeholder='All Type' size="sm" variant="unstyled" onChange={(e) => {
                setType(e.target.value)
                getData(search, e.target.value, status, limit, page)
              }}>
                <option value='live'>Live</option>
                <option value='standard'>Standard</option>
              </Select>
            </div>
            <div className="w-full rounded py-2 pl-2 border">
              <Select placeholder='All Status' size="sm" variant="unstyled" onChange={(e) => {
                setStatus(e.target.value)
                getData(search, type, e.target.value, limit, page)
              }}>
              <option value='waiting'>Waiting</option>
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='completed'>Completed</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <ExamPracticeTable TableHead={TableHead} list={list} onOpen={onOpen} setSelectedData={(id) => setSelectedData(id)} type="exams" onOpenPublish={onOpenConfirmModal} />
              </div>
              <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} type={type} status={status} total={dataInstitute.total} doLimit={data => setLimit(data)} doData={getData} />
            </div>
          </div>
        </div>
      </Card>
      <ModalUnPublish isConfirmModal={isConfirmModal} onCloseConfirmModal={onCloseConfirmModal} selectedData={selectedData} onUnpublish={(data) => onUnpublish(data)} />
      <ModalDelete isOpen={isOpen} onClose={onClose} onDelete={(data) => onDelete(data)} selectedData={selectedData} />
    </div>
  )
}
Index.layout = Layout
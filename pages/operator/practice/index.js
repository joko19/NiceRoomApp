import Layout from "../../../Layout/Layout";
import Card from "../../../components/Cards/Card";
import { useEffect, useState } from 'react'
import {
  useDisclosure,
} from '@chakra-ui/react'
import Pagination from "../../../components/Pagination/pagination";
import { Select } from '@chakra-ui/react'
import apiPractice from './../../../action/practice'
import Link from "next/link";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import Button from '../../../components/Button/button'
import ExamPracticeTable from "../../../components/Table/ExamsPracticeTable";
import { ModalUnPublish } from "../../../components/Modal/ModalUnpublish";
import apiExam from "../../../action/exam";

export default function Index() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [dataInstitute, setDataInstitute] = useState([])
  const [typePractice, setTypePractice] = useState([])
  const [list, setList] = useState([])
  const TableHead = ['Practice Name', 'Type', 'Start Date', 'Total Question', 'Status', 'Action']

  const {
    isOpen: isConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal
  } = useDisclosure()
  const getData = async (search, type, status, limit, page) => {
    await apiPractice.index(search, type, status, limit, page)
      .then((res) => {
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


  useEffect(async () => {
    await apiExam.allType()
      .then((res) => setTypePractice(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  const onDelete = async (id) => {
    await apiPractice.deleted(id)
      .then(() => {
        getData(search, type, status, limit, page)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const onUnpublish = async (id) => {
    await apiPractice.unpublish(id)
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
        title="Practice"
        right={(
          <Link href="/operator/practice/create">
            <a> <Button title="+ Create Practice" /></a>
          </Link>
        )}
      >
        <div className="flex gap-4 mb-4">
          <input type="text" className=" border rounded w-1/2 p-2 text-sm" value={search} placeholder="Search Practice" onChange={(e) => {
            setSearch(e.target.value)
            getData(e.target.value, type, status, limit, page)
          }} />

          <div className="flex gap-4 w-1/2 h-full text-sm ">
            <div className="w-full border rounded py-2 pl-2">
              <select defaultValue={"all type"} className="bg-white w-full" onChange={(e) => {
                setType(e.target.value)
                getData(search, e.target.value, status, limit, page)
              }}>
                <option value="">All Type</option>
                {typePractice.map((item, index) => (
                  <option key={index} value={item.name}>{item.name}</option>
                ))}
              </select>

            </div>
            <div className="w-full py-2 pl-2 rounded border">
              <select className="h-full w-full  bg-white" onChange={(e) => {
                setStatus(e.target.value)
                getData(search, type, e.target.value, limit, page)
              }}>
                <option value=''>All Status</option>
                <option value='waiting'>Waiting</option>
                <option value='draft'>Draft</option>
                <option value='published'>Published</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <ExamPracticeTable TableHead={TableHead} list={list} onOpen={onOpen} setSelectedData={(id) => setSelectedData(id)} type="practice" onOpenPublish={onOpenConfirmModal} />
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
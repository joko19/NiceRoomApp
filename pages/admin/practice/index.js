import Layout from "../../../Layout/Layout";
import Card from "../../../components/Cards/Card";
import { useEffect, useState } from 'react'
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import Pagination from "../../../components/Pagination/pagination";
import { Select } from '@chakra-ui/react'
import apiPractice from './../../../action/practice'
import Link from "next/link";

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
  const TableHead = ['Practice Name', 'Type', 'Status', 'Action']

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


  const onDelete = async (id) => {
    await apiPractice.deleted(id)
      .then(() => {
        getData(search, type, status, limit, page)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  return (
    <>
      <div className="md:py-24 mt-24 md:mt-12">
        <Card
          title="Practice"
          right={(
            <Link href="/admin/practice/create">
              <a className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" > + Create Practice</a>
            </Link>
          )}
        >
          <div className="flex gap-4 mb-4">
            <input type="text" className=" border rounded-lg w-1/2 p-2" value={search} placeholder="Search Practice" onChange={(e) => {
              setSearch(e.target.value)
              getData(e.target.value, type, status, limit, page)
            }} />

            <div className="flex gap-4 w-1/2 h-full  ">
              <Select placeholder='All Type' className="h-full" size="lg" onChange={(e) => {
                setType(e.target.value)
                getData(search, e.target.value, status, limit, page)
              }}>
                <option value='live'>Live</option>
                <option value='mixed'>Mixed</option>
              </Select>
              <Select placeholder='All Status' className="h-full" size="lg" onChange={(e) => {
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
                  <table className="table md:min-w-full overflow-auto divide-y divide-gray-200">
                    <thead className="bg-black-9" >
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Test Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-center tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center tracking-wider">
                        Action
                      </th>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4">
                            <div className="flex ml-8">
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.exam_type.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className={`${item.status === 'draft' ? 'bg-black-8 text-black-3' : 'bg-green-2 text-green-1'} text-center rounded-lg p-4 `}>
                              {item.status}
                            </div>
                          </td>
                          <td className="py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium m-auto flex flex-row-reverse h-full">
                            <div className="flex  gap-3 p-3 m-auto">
                              <Link href={`practice/${item.id}`}>
                                <a className="text-indigo-600 hover:text-indigo-900 m-auto">
                                  <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                                  <span className="text-blue-1 inline-block align-top">    Edit Practice</span>
                                </a>
                              </Link>
                              <button href="#" className="text-indigo-600 hover:text-indigo-900 m-auto" onClick={() => {
                                setSelectedData(item.id),
                                  onOpen()
                              }}>
                                <Image src="/asset/icon/table/fi_trash_red.png" className="inline-block align-baseline " width={16} height={16} alt="icon deleted" />
                                <span className="text-red-1 inline-block align-top">    Delete</span>
                              </button>
                            </div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} type={type} status={status} total={dataInstitute.total} doLimit={data => setLimit(data)} doData={getData} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center> Delete Confirmation</center></ModalHeader>
          <ModalBody>
            <center className="mb-8">Are you sure to delete ?</center>
            <div className="flex gap-4 justify-center">
              <button className="text-black-4 p-3" mr={3} onClick={onClose}>
                Cancel
              </button>
              <button className="bg-blue-1 text-white p-3 rounded-lg" onClick={() => {
                onDelete(selectedData)
                onClose()
              }} onClose={onClose}>Deleted</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
Index.layout = Layout
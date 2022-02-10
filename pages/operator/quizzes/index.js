import Layout from "../../../Layout/Layout";
import Card from "../../../components/Cards/Card";
import { useEffect, useState } from 'react'
import Image from "next/image";
import {
  useDisclosure,
} from '@chakra-ui/react'
import Pagination from "../../../components/Pagination/pagination";
import { Select } from '@chakra-ui/react'
import apiQuiz from "../../../action/quiz";
import Link from "next/link";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import Button from "../../../components/Button/button";

export default function Create() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [dataInstitute, setDataInstitute] = useState([])
  const [list, setList] = useState([])

  const getData = async (search, type, status, limit, page) => {
    await apiQuiz.index(search, type, status, limit, page)
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
    await apiQuiz.deleted(id)
      .then(() => {
        getData(search, type, status, limit, page)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  return (
    < >
      <div className="md:py-12">
        <Card
          title="Quizzes"
          right={(
            <Link href="/operator/quizzes/create">
              <a> <Button title="+ Create Quiz" /></a>
            </Link>
          )}
        >
          <div className="flex gap-4 my-4">
            <input type="text" className=" border rounded-lg w-1/2 p-2 text-sm" value={search} placeholder="Search Quiz" onChange={(e) => {
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
                  <table className="table md:min-w-full overflow-auto divide-y divide-gray-200 text-sm">
                    <thead className="bg-black-9" >
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Quiz Name
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div>{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.type}</div>
                          </td>
                          <td className="">
                            <div className={`${item.status === 'draft' ? 'bg-black-8 text-black-3' : 'bg-green-2 text-green-1'} text-center w-24 flex-0 m-auto font-bold  rounded-lg py-3 `}>
                              {item.status === 'draft' ? 'Draft' : 'Published'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <div className="mx-auto flex gap-4">
                              <Link href={`quizzes/edit/${item.id}`}>
                                <a className="text-indigo-600 hover:text-indigo-900">
                                  <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                                </a>
                              </Link>
                              <button href="#" className="text-indigo-600 hover:text-indigo-900">
                                <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" onClick={() => {
                                  // setNameDeleted(item.name)
                                  setSelectedData(item.id),
                                    onOpen()
                                }} />
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

      <ModalDelete isOpen={isOpen} onClose={onClose} onDelete={(data) => onDelete(data)} selectedData={selectedData} />
    </>
  )
}
Create.layout = Layout
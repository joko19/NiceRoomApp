import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../../components/Button/Icon";
import Card from "../../../components/Cards/Card";
import Layout from "../../../Layout/Layout";
import apiNews from "../../../action/news";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import Pagination from "../../../components/Pagination/pagination";

export default function News(props) {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [dataNews, setDataNews] = useState({})
  const [list, setList] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [isPublish, setIsPublish] = useState()
  const [title, setTitle] = useState()
  const [news, setNews] = useState([])
  const tableHead = ['Title', 'Sub-Title', 'Date', 'Status', 'Action']
  const {
    isOpen: isConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal
  } = useDisclosure()

  const getData = async (search, limit, page) => {
    await apiNews.all(search, limit, page)
      .then((res) => {
        setDataNews(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData(search, limit, page)
  }, [])

  const onDelete = async (id) => {
    await apiNews.deleted(id)
      .then((res) => {
        getData(search, limit, page)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onPublish = async (id, status) => {
    await apiNews.publish(id, { status: status })
      .then((res) => {
        getData(search, limit, page)
      })
  }

  return (
    <>
      <div className="md:py-24">
        <Card
          title="News"
          right={(
            <Link href="/admin/news/create">
              <a className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" > + Create News</a>
            </Link>
          )}
        >
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search News" onChange={(e) => {
            setSearch(e.target.value)
            getData(e.target.value, limit, page)
          }} />

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table min-w-full divide-y divide-gray-200">
                    <thead className="bg-black-9" >
                      {tableHead.map((item) => (
                        <th key={item} scope="col" className="px-6 py-3 text-left tracking-wider">
                          {item}
                        </th>
                      ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list.map((item) => {
                        const date = new Date(item.created_at)
                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div>{item.title}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>{item.sub_title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">{date.toDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className={`${item.status === 'draft' ? 'bg-black-8 text-black-3' : 'bg-green-2 text-green-1'} text-center rounded-lg p-3`}>
                                {item.status}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                              {item.status === 'draft' ? (
                                <>
                                  <Link href={`news/edit/${item.id}`}>
                                    <a className="text-indigo-600 hover:text-indigo-900">
                                      <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                                    </a>
                                  </Link>
                                  <button onClick={() => {
                                    setIsPublish(false)
                                    setTitle(item.title)
                                    setSelectedData(item.id)
                                    onOpenConfirmModal()
                                    
                                  }}>
                                    <Image src="/asset/icon/table/ic_repeat.png" width={16} height={16} alt="icon publish" />
                                  </button>
                                </>
                              ) : (
                                <button onClick={() => {
                                  setIsPublish(true)
                                  setTitle(item.title)
                                  setSelectedData(item.id)
                                  onOpenConfirmModal()
                                }}>
                                  <Image src="/asset/icon/table/ic_repeat.png" width={16} height={16} alt="icon unpublish" />
                                </button>

                              )}
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon delete" onClick={() => {
                                  setSelectedData(item.id),
                                    onOpen()
                                }} />
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination page={page} lastPage={dataNews.last_page} limit={limit} search={search} total={dataNews.total} doLimit={data => setLimit(data)} doData={getData} />
              </div>
            </div>
          </div>
        </Card>
      </div>



      {/* Success Modal */}
      <Modal isOpen={isConfirmModal} onClose={onCloseConfirmModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center>Confirmation</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center ">
              <p>Are you sure you want to change the status of <span className="text-blue-1"> {isPublish ? 'Publish' : 'Draft'} </span> to <span className="text-blue-1">{isPublish ? 'Draft' : 'Publish'}</span> on the news &quot;{title}&quot; ? </p>
              <div className="self-center flex gap-4">
                <button className=" rounded-lg text-black-4 mt-4 block align-center p-3" onClick={() => {
                  onCloseConfirmModal()
                }}>Cancel</button>
                <button className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3" onClick={() => {
                  onCloseConfirmModal()
                  onPublish(selectedData, isPublish ? 'draft' : 'published')
                }}>Yes, Im sure</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Deleted Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure to Delete it ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => {
              onDelete(selectedData)
              onClose()
            }} onClose={onClose}>Deleted</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
News.layout = Layout
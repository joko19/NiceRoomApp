import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../../components/Button/Icon";
import Card from "../../../components/Cards/Card";
import Admin from "../../../Layout/Admin";
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


export default function News(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [news, setNews] = useState([])
  const tableHead = ['Title', 'Sub-Title', 'Data', 'Action']
  const getNews = async () => {
    await apiNews.all()
      .then((res) => {
        console.log(res.data.data.data)
        setNews(res.data.data.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(async () => {
    getNews()
  }, [])

  const onDelete = async (id) => {
    await apiNews.deleted(id)
      .then((res) => {
        if (res.data.status) getNews()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="md:py-24">
        <Card
          title="Institution"
          right={(
            <Link href="/admin/news/create">
              <a className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" > + Create News</a>
            </Link>
          )}
        >
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Institute" />

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
                      {news.map((item) => (
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
                          <td className="px-6 py-4 whitespace-nowrap ">{item.establishment_year}</td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon edit" />
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon edit" onClick={() => {
                                setSelectedData(item.id),
                                  onOpen()
                              }} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex mt-8 flex-row-reverse flex-end gap-4">
                  <Icon src="/asset/icon/table/ic_last.png" />
                  <Icon src="/asset/icon/table/ic_next.png" />
                  <Icon src="/asset/icon/table/ic_prev.png" />
                  <Icon src="/asset/icon/table/ic_first.png" />
                  <span> 1 - 10 from 4</span>
                  <Icon src="/asset/icon/table/ic_down.png" />
                  <span>Data per page : 10 </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
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
News.layout = Admin
import Admin from "../../../Layout/Admin";
import Card from "../../../components/Cards/Card";
import apiInstitute from "../../../action/institute";
import { useEffect, useState, useRef, } from 'react'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../../../components/Button/Icon";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export default function Institute() {
  const Router = useRouter()
  const { id } = Router.query
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [total, setTotal] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal
  } = useDisclosure()
  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [dataInstitute, setDataInstitute] = useState([])
  const [list, setList] = useState([])
  const TableHead = ['Name', 'Address', 'State', 'City', 'Status']
  const { register, handleSubmit, setValue, getValues } = useForm();

  const getData = async () => {
    await apiInstitute.detail(id)
      .then((res) => {
        console.log(res.data.data)
        setDataInstitute(res.data.data)
        setList(res.data.data.branches)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData(search, limit, page)
  }, [dataInstitute])

  const onSubmit = async (data) => {
    await apiInstitute.create(data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    getData(search, limit, page)
    onCloseCreateModal()
    onOpenSuccessModal()
  }

  const onDelete = async (id) => {
    await apiInstitute.deleted(id)
      .then((res) => {
        if (res.data.status) getAll()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSearch = (e) => {
    console.log(e.target.value)

  }

  return (
    <>
      <div className="md:py-24">
        <Link href="/admin/institution">
          <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
        </Link>
        <div className="bg-white p-4 rounded-lg">
          <div className="flex flex-auto w-full flex-row gap-4 m-4 space-between">
            <div className="flex">
              <Image src="/asset/icon/table/ic_building.png" height={64} width={64} alt="icon university" />
            </div>
            <div className="flex flex-col flex-1">
              <h1 className="font-bold">{dataInstitute.name}</h1>
              <span className="text-black-4">Established {dataInstitute.establishment_year}</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-black-4">address</span>
              <p className="text-lg">{dataInstitute.address}</p>
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-black-4">State</span>
              <p className="text-lg">{dataInstitute.state}</p>
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-black-4">City</span>
              <p className="text-lg">{dataInstitute.city}</p>
            </div>
          </div>
          <h1 className="font-bold text-xl my-2">List Branch</h1>
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Institute" onChange={(e) => {
            setSearch(e.target.value)
            getData(e.target.value, limit, page)
          }} />

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table min-w-full divide-y divide-gray-200">
                    <thead className="bg-black-9" >
                      {TableHead.map((item) => (
                        <th key={item} scope="col" className="px-6 py-3 text-left tracking-wider">
                          {item}
                        </th>
                      ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list.map((item) => (
                        <tr key={item.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div>{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.state}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span>
                              {item.city}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.establishment_year}</td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon edit" />
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                            </a>
                            <button href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" onClick={() => {
                                setSelectedData(item.id),
                                  onOpen()
                              }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex mt-8 flex-row-reverse flex-end gap-4">
                  <button className={`${page !== dataInstitute.last_page ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
                    if (page !== dataInstitute.last_page) {
                      getData(search, limit, dataInstitute.last_page)
                    }
                  }}>
                    <FaAngleDoubleRight />
                  </button>
                  <button className={`${page < dataInstitute.last_page ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
                    if (page < dataInstitute.last_page) {
                      getData(search, limit, page + 1)
                    }
                  }}>
                    <FaAngleRight />
                  </button>
                  <button className={`${page > 1 ? 'bg-black-6' : 'cursor-default'} p-1  rounded-full align-middle`} onClick={() => {
                    if (page > 1) {
                      getData(search, limit, page - 1)
                    }
                  }}>
                    <FaAngleLeft />
                  </button>
                  <button className={`${page !== 1 ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
                    if (page !== 1) {
                      getData(search, limit, 1)
                    }
                  }}>
                    <FaAngleDoubleLeft />
                  </button>
                  <span> {page < dataInstitute.last_page ? page : dataInstitute.last_page} - {dataInstitute.last_page} from {dataInstitute.total}</span>
                  <select className="bg-white" value={limit} onChange={(e) => {
                    setLimit(e.target.value)
                    getData(search, e.target.value, page)
                  }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <span>Data per page : </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Institute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="flex gap-4">
                <div>
                  <p>Institute Name</p>
                  <input type="text" className="form border p-4 rounded-lg" placeholder="Input Institute Name" {...register("name", { required: true })} />
                </div>
                <div>
                  <p>Address</p>
                  <input type="text" className="form border p-4 rounded-lg" placeholder="Input Institute Address" {...register("address", { required: true })} />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="mt-4">State</p>
                  <input type="text" className="form border p-4 rounded-lg" placeholder="Input Institute Name" {...register("state", { required: true })} />
                </div>
                <div>
                  <p className="mt-4">City</p>
                  <input type="text" className="form border p-4 rounded-lg" placeholder="Input Institute Name" {...register("city", { required: true })} />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="mt-4">Establishment Year</p>
                  <input type="text" className="form border p-4 rounded-lg" placeholder="Input Establishment Year" {...register("establishment_year", { required: true })} />
                </div>
                <div>
                  <p className="mt-4">Pin Code</p>
                  <input type="number" className="form border p-4 rounded-lg" placeholder="Input 6-Digits Code Number" {...register("pin_code", { required: true })} />
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" >Save Institute</button>
                <button type="button" className="text-black-4 p-3 rounded-lg" onClick={onCloseCreateModal}>Close</button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center ">
              <p>{getValues('name')} Created Successfully </p>
              <div className="self-center">
                <button className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3" onClick={onCloseSuccessModal}>Okay</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation */}
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
Institute.layout = Admin
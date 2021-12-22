import Admin from "../../Layout/Admin";
import Card from "../../components/Cards/Card";
import Icon from "../../components/Button/Icon";
import { useState, useEffect } from "react";
import apiAdmin from "../../action/admin";
import Image from "next/image";
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
import { useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaEyeSlash } from "react-icons/fa";
import apiInstitute from "../../action/institute";


export default function InstituteAdmin(props) {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [dataInstitute, setDataInstitute] = useState([])
  const [allInstitute, setAllInstitute] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [allAdmin, setAllAdmin] = useState([])
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)
  const [passwdLogin, setPasswdLogin] = useState(true)
  const tableHead = ['Employee ID', 'Name', 'Email', 'Phone', 'Institute', 'Action']
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
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


  const getData = async (search, limit, page) => {
    await apiAdmin.all(search, limit, page)
      .then((res) => {
        setDataInstitute(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getInstitue = async () => {
    await apiInstitute.index()
      .then((res) => setAllInstitute(res.data.data))
  }

  useEffect(() => {
    getData(search, limit, page)
    getInstitue()
  }, [])

  const onDelete = async (id) => {
    await apiAdmin.deleted(id)
      .then((res) => {
        if (res.data.status) getAllAdmin()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSubmit = async (data) => {
    await apiAdmin.create(data)
      .then((res) => {
        getData(search, limit, page)
        onCloseCreateModal()
        onOpenSuccessModal()

      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="pt-32 md:py-24">
        <Card
          title="Institute Admin"
          right={(
            <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" onClick={onOpenCreateModal}>
              + Create Admin
            </button>
          )}
        >
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Admin" />

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
                      {list.map((item) => (
                        <tr key={item.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div>{item.employee_id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span>
                              {item.email}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.institute.name}</td>
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
        </Card>
      </div>


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{update ? 'Edit' : 'Create'} Institute Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <p>Full Name</p>
                <input type="text" className="form w-full border p-4 rounded-lg" placeholder="Input Admin Full Name" {...register("name", { required: true })} />
              </div>
              <div className="flex gap-4 flex-col md:flex-row">

                <div className="w-full">
                  <p className="mt-4">Institute</p>
                  <select className="form border bg-white w-full p-4 rounded-lg" placeholder="Choose Institute"  {...register("institute_id", { required: true })} >
                    <option disabled>Select Institute</option>
                    {allInstitute.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <p className="mt-4">Employee ID</p>
                  <input type="text" className="form  w-full border p-4 rounded-lg" placeholder="Input Employee ID" {...register("employee_id", { required: true })} />
                </div>
              </div>

              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full ">
                  <p className="mt-4">Gender</p>
                  <select className="form border bg-white w-full p-4 rounded-lg" placeholder="Choose Gender"  {...register("gender", { required: true })} >
                    <option disabled>Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="w-full">
                  <p className="mt-4">Phone Number</p>
                  <input type="number" className="form border p-4 w-full rounded-lg" placeholder="Input Phone Number" {...register("phone", { required: true })} />
                </div>
              </div>

              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full">
                  <p className="mt-4">Email</p>
                  <input type="text" className="form w-full border p-4 rounded-lg" placeholder="Input Email Address" {...register("email", { required: true })} />
                </div>
                <div className="w-full">
                  <p className="mt-4">Password</p>
                  <div className="relative">
                    <input type={`${passwdLogin ? 'password' : 'text'}`} {...register("password", { required: true })} className="form w-full border p-4 rounded-lg" placeholder="Input New Password" />
                    <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                      passwdLogin ? setPasswdLogin(false) : setPasswdLogin(true)
                    }}>
                      {passwdLogin ?
                        (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                        (<FaEye className=" z-10 inline-block align-middle" />)
                      }
                    </span>
                  </div>
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
              <p>Create Admin Institute Successfully </p>
              <div className="self-center">
                <button className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3" onClick={() => {
                  onCloseSuccessModal()
                  setUpdate(false)
                }}>Okay</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Dekete Modal */}
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
InstituteAdmin.layout = Admin
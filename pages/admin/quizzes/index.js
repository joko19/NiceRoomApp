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
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Pagination from "../../../components/Pagination/pagination";
import { region } from "../../../action/India";
import { Select } from '@chakra-ui/react'
import apiQuiz from "../../../action/quiz";
import Link from "next/link";

export default function Create() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [update, setUpdate] = useState(false)
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
  const [errors, setErrors] = useState()
  const TableHead = ['Quiz Name', 'Type', 'Status', 'Action']
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [cities, setCities] = useState([])
  const [nameDeleted, setNameDeleted] = useState()

  const getData = async (search, type, status, limit, page) => {
    await apiQuiz.index(search, type, status, limit, page)
      .then((res) => {
        console.log(res.data.data)
        setDataInstitute(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData(search, type, status, limit, page)
  }, [])

  const getBranch = async () => {
    await apiQuiz.all()
      .then((res) => {
        console.log(res.data.data)
        setBranch(res.data.data)
      })
  }

  const getDetail = async (id) => {
    await apiQuiz.detail(id)
      .then((result) => {
        const res = result.data.data
        setValue("name", res.name)
        setValue("email", res.email)
        setValue("address", res.address)
        setValue("phone", res.phone)
        setValue("pin_code", res.pin_code)
        setValue("landline_number", res.landline_number)
        setValue("state", res.state)
        console.log(res.state)
        const city = region.find(state => state.name === res.state).cities
        setCities(city)
        setValue("city", res.city)
      })
  }

  const onSubmit = async (data) => {
    update ? await apiQuiz.update(selectedData, data)
      .then((res) => {
        reset(res)
        onCloseCreateModal()
        getData(search, type, status, limit, page)
        onOpenSuccessModal()
      })
      .catch((err) => {
        setErrors(err.response.data.data)
        console.log(err)
      }) : await apiQuiz.create(data)
        .then((res) => {
          reset(res)
          onCloseCreateModal()
          setUpdate(false)
          getData(search, type, status, limit, page)
          onOpenSuccessModal()
        })
        .catch((err) => {
          setErrors(err.response.data.data)
        })
  }

  const onDelete = async (id) => {
    await apiQuiz.deleted(id)
      .then(() => {
        getData(search, type, status, limit, page)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const chooseState = (e) => {
    const city = region.find(state => state.name === e.target.value).cities
    setCities(city)
  }

  return (
    <>
      <div className="md:py-24 mt-24 md:mt-12">
        <Card
          title="Quizzes"
          right={(
            <Link href="/admin/quizzes/create">
              <a className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" > + Create Quiz</a>
            </Link>
          )}
        >
          <div className="flex gap-4 mb-4">
            <input type="text" className=" border rounded-lg w-1/2 p-2" value={search} placeholder="Search Quiz" onChange={(e) => {
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
                      {TableHead.map((item) => (
                        <th key={item} scope="col" className="px-6 py-3 text-left tracking-wider">
                          {item}
                        </th>
                      ))}
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`${item.status === 'draft' ? 'bg-black-8 text-black-3' : 'bg-green-2 text-green-1'} text-center rounded-lg p-3`}>
                              {item.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                              // getDetail(item.id)
                              // setSelectedData(item.id)
                              // setUpdate(true)
                              // onOpenCreateModal()
                              setErrors(null)
                            }}>
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                            </button>
                            <button href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" onClick={() => {
                                setNameDeleted(item.name)
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
                <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} type={type} status={status} total={dataInstitute.total} doLimit={data => setLimit(data)} doData={getData} />
              </div>
            </div>
          </div>
        </Card>
      </div>


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{update ? 'Edit' : 'Create'} Branch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
              <div className="flex gap-4">
                <div className="w-full">
                  <p>Branch Name {errors && (
                    <span className="text-red-1 text-sm">{errors.name}</span>
                  )}</p>
                  <input type="text" className="w-full form border p-4 rounded-lg" placeholder="Input Branch Name" {...register("name")} />
                </div>
                <div className="w-full">
                  <p>Address {errors && (
                    <span className="text-red-1 text-sm">{errors.address}</span>
                  )}</p>
                  <input type="text" className="form border w-full p-4 rounded-lg" placeholder="Input Branch Address" {...register("address")} />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-full">
                  <p className="mt-4">State {errors && (
                    <span className="text-red-1 text-sm">{errors.state}</span>
                  )}</p>
                  <select id="state" className="form border bg-white w-full p-4 rounded-lg" defaultValue="Select State" placeholder="Choose State" {...register("state")} onChange={chooseState}>
                    <option disabled>Select State</option>
                    {region.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="w-full">
                  <p className="mt-4">City {errors && (
                    <span className="text-red-1 text-sm">{errors.city}</span>
                  )}</p>
                  <select className="form border bg-white w-full p-4 rounded-lg" defaultValue="Select City"  {...register("city")} >
                    <option disabled>Select City</option>
                    {cities.map((item) => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full">
                  <p className="mt-4">Email {errors && (
                    <span className="text-red-1 text-sm">{errors.email}</span>
                  )}</p>
                  <input type="text" className="form border p-4 w-full rounded-lg" placeholder="Input Email" {...register("email")} />
                </div>
                <div className="w-full">
                  <p className="mt-4">Landline Number {errors && (
                    <span className="text-red-1 text-sm">{errors.landline_number}</span>
                  )}</p>
                  <input type="number" className="form border p-4 w-full rounded-lg" placeholder="Input Landline Number" {...register("landline_number")} />
                </div>
              </div>

              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full">
                  <p className="mt-4">Phone Number {errors && (
                    <span className="text-red-1 text-sm">{errors.phone}</span>
                  )}</p>
                  <input type="number" className="form border p-4 w-full rounded-lg" placeholder="Input Phone Number" {...register("phone")} />
                </div>
                <div className="w-full">
                  <p className="mt-4">Pin Code {errors && (
                    <span className="text-red-1 text-sm">{errors.pin_code}</span>
                  )}</p>
                  <input type="number" className="form border p-4 w-full rounded-lg" placeholder="Input 6-Digits Code Number" {...register("pin_code")} />
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" >Save</button>
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
              <p>{getValues('name')} {update ? 'Update' : 'Create'} Successfully </p>
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
Create.layout = Layout
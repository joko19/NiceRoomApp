import Layout from "../../Layout/Layout";
import Card from "../../components/Cards/Card";
import apiStudent from "../../action/student";
import apiBranch from "../../action/branch";
import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination/pagination";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import instance from "../../action/instance";
import apiBatch from "../../action/batch";

export default function Student() {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [branch, setBranch] = useState('')
  const [batch, setBatch] = useState('')
  const [status, setStatus] = useState('')
  const [update, setUpdate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nameDeleted, setNameDeleted] = useState()
  const [passwd, setpasswd] = useState(true)
  const [listBranch, setListBranch] = useState([])
  const [listBatch, setListBatch] = useState([])
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
  const TableHead = ['Student Name', 'Enrollment Number', 'Branch', 'Status', 'Action']
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [file, setFile] = useState()

  const getData = async (search, branch, batch, status, limit, page) => {
    await apiStudent.index(search, branch, batch, status, limit, page)
      .then((res) => {
        console.log(branch)
        setDataInstitute(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData(search, branch, batch, status, limit, page)
    getBranch()
    getBatch()
  }, [])

  const getBranch = async () => {
    await apiBranch.all()
      .then((res) => {
        setListBranch(res.data.data)
      })
  }

  const getBatch = async () => {
    await apiBatch.all()
      .then((res) => {
        setListBatch(res.data.data)
      })
  }

  const getDetail = async (id) => {
    await apiStudent.detail(id)
      .then((result) => {
        const res = result.data.data
        console.log(res)
        res.avatar ? setAvatar(instance.pathImg + res.avatar) : setAvatar('/asset/img/blank_profile.png')
        setValue("name", res.name)
        setValue("email", res.email)
        setValue("gender", res.gender)
        setValue("phone", res.phone)
        setValue("code", res.enrollments[0].code)
        getBatch()
        getBranch()
        setValue("branch_id", res.enrollments[0].branch_id)
        setValue("batch_id", res.enrollments[0].batch_id)
      })
  }

  const onSubmit = async (form) => {
    if (form.gender === 'Select State') {
      data.gender = ''
    }
    var data = new FormData();
    data.append("name", form.name)
    data.append("gender", form.gender)
    data.append("email", form.email)
    data.append("phone", form.phone)
    data.append("employee_id", form.employee_id)
    data.append("password", form.password)
    data.append("password_confirmation", form.password_confirmation)
    data.append("branch_id", form.branch_id)
    data.append("batch_id", form.batch_id)
    if (file) {
      data.append("avatar", file)
    }
    update ? await apiStudent.update(selectedData, data)
      .then((res) => {
        reset(res)
        onCloseCreateModal()
        getData(search, branch, batch, status, limit, page)
        onOpenSuccessModal()
        setAvatar('/asset/img/blank_profile.png')
        setFile(null)
      })
      .catch((err) => {
        setErrors(err.response.data.data)
        console.log(err)
      }) : await apiStudent.create(data)
        .then((res) => {
          reset(res)
          onCloseCreateModal()
          setUpdate(false)
          getData(search, branch, batch, status, limit, page)
          onOpenSuccessModal()
          setAvatar('/asset/img/blank_profile.png')
          setFile(null)
        })
        .catch((err) => {
          setErrors(err.response.data.data)
        })
    getData(search, branch, batch, status, limit, page)
  }

  const onDelete = async (id) => {
    await apiStudent.deleted(id)
      .then(() => {
        getData(search, branch, batch, status, limit, page)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const choosePhoto = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  return (
    <>
      <div className="md:py-24 mt-24 md:mt-12">
        <Card
          title="Students"
          right={(
            <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" onClick={() => {
              setAvatar('/asset/img/blank_profile.png')
              getBranch()
              getBatch()
              setUpdate(false)
              onOpenCreateModal()
              setErrors(null)
              reset()
            }}>
              + Create Student
            </button>
          )}
        >
          <div className="flex gap-4 mb-4">
            <input type="text" className=" border rounded-lg w-full p-2" placeholder="Search Student" onChange={(e) => {
              setSearch(e.target.value)
              getData(e.target.value, branch, batch, status, limit, page)
            }} />

            <div className="w-full h-full  ">
              <Select placeholder='All Branch' className="h-full" size="lg" onChange={(e) => {
                setBranch(e.target.value)
                getData(search, e.target.value, batch, status, limit, page)
              }}>
                {listBranch.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </Select>
            </div>
            <div className="w-full h-full  ">
              <Select placeholder='All Batch' className="h-full" size="lg" onChange={(e) => {
                setBatch(e.target.value)
                getData(search, branch, e.target.value, status, limit, page)
              }}>
                {listBatch.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </Select>
            </div>
            <div className="w-full h-full  ">
              <Select placeholder='All Status' className="h-full" size="lg" onChange={(e) => {
                setStatus(e.target.value)
                getData(search, branch, batch, e.target.value, limit, page)
              }}>
                <option value='Pending'>Pending</option>
                <option value='Approve'>Approve</option>
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
                      {list.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div>{item.user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.code}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span>
                              {item.branch.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.status}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <Link href={`/admin/institution/${item.id}`}>
                              <a className="text-indigo-600 hover:text-indigo-900">
                                <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon detail" />
                              </a>
                            </Link>
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                              getDetail(item.user.id)
                              setSelectedData(item.user.id)
                              setUpdate(true)
                              onOpenCreateModal()
                              setErrors(null)
                            }}>
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                            </button>
                            <button href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" onClick={() => {
                                setNameDeleted(item.user.name)
                                setSelectedData(item.user.id),
                                  onOpen()
                              }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} total={dataInstitute.total} status={status} branch={branch} batch={batch} doLimit={data => setLimit(data)} doData={getData} />
              </div>
            </div>
          </div>
        </Card>
      </div>


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{update ? 'Edit' : 'Add'} Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="pb-4">

              <div className="flex justify-center">
                <div className="m-4 relative">
                  <Image className="rounded-full object-cover" src={avatar} alt="photo profile" height={160} width={160} />
                  <div className="absolute bottom-5 right-0">
                    <label htmlFor="file-input">
                      <Image src="/asset/icon/ic_edit.png" alt="icon update" width={48} height={48} className="ml-6 cursor-pointer" />
                    </label>
                  </div>
                </div>
                <div className="hidden">
                  <input id="file-input" type="file" className="hidden -z-50" accept="image/*" onChange={choosePhoto} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <p>Full Name {errors && (
                    <span className="text-red-1 text-sm">{errors.name}</span>
                  )}</p>
                  <input type="text" className="w-full form border p-4 rounded-lg" placeholder="Input Full Name" {...register("name")} />
                </div>
                <div className="w-full">
                  <p>Email {errors && (
                    <span className="text-red-1 text-sm">{errors.email}</span>
                  )}</p>
                  <input type="text" className="form border w-full p-4 rounded-lg" placeholder="Input Email Address" {...register("email")} />
                </div>
              </div>
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full ">
                  <p className="mt-4">Gender{errors && (
                    <span className="text-red-1 text-sm">{errors.gender}</span>
                  )}</p>
                  <select className="form border bg-white w-full p-4 rounded-lg" defaultValue="Select Gender" placeholder="Choose Gender"  {...register("gender",)} >
                    <option disabled>Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="w-full">
                  <p className="mt-4">Enrollment ID (Optional) {errors && (
                    <span className="text-red-1 text-sm">{errors.code}</span>
                  )}</p>
                  <input type="text" className="form border p-4 w-full rounded-lg" placeholder="Input Enrollment ID" {...register("code")} />
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
                  <p className="mt-4">Branch {errors && (
                    <span className="text-red-1 text-sm">{errors.branch_id}</span>
                  )}</p>
                  <select className="form border bg-white w-full p-4 rounded-lg" defaultValue="Select Branch" placeholder="Choose Branch"  {...register("branch_id",)} >
                    <option disabled>Select Branch</option>
                    {listBranch.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full">
                  <p className="mt-4">Batch {errors && (
                    <span className="text-red-1 text-sm">{errors.batch_id}</span>
                  )}</p>
                  <select className="form border bg-white w-full p-4 rounded-lg" defaultValue="Select Batch" placeholder="Choose Batch"  {...register("batch_id",)} >
                    <option disabled>Select Batch</option>
                    {listBatch.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <p className="mt-4">Password  {errors && (
                    <span className="text-red-1 text-sm">{errors.password}</span>
                  )}</p>
                  <div className="relative">
                    <input type={`${passwd ? 'password' : 'text'}`} {...register("password")} className="form w-full border p-4 rounded-lg" placeholder="Input New Password" />
                    <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                      passwd ? setpasswd(false) : setpasswd(true)
                    }}>
                      {passwd ?
                        (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                        (<FaEye className=" z-10 inline-block align-middle" />)
                      }
                    </span>
                  </div>
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
          <ModalHeader><center> Delete Student</center></ModalHeader>
          <ModalBody>
            <center className="mb-8">Are you sure to delete {nameDeleted} from student ?</center>
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
Student.layout = Layout
import Layout from "../../Layout/Layout";
import Card from "../../components/Cards/Card";
import apiOperator from "../../action/operator";
import apiBranch from "../../action/branch";
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
import Pagination from "../../components/Pagination/pagination";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import instance from "../../action/instance";
import Button from "../../components/Button/button";

export default function Operator() {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [update, setUpdate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nameDeleted, setNameDeleted] = useState()
  const [passwd, setpasswd] = useState(true)
  const [branch, setBranch] = useState([])
  const [passwdConfirmation, setpasswdConfirmation] = useState(true)
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
  const TableHead = ['Institute Name', 'Email', 'Phone', 'Action']
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [file, setFile] = useState()

  const getData = async (search, limit, page) => {
    await apiOperator.index(search, limit, page)
      .then((res) => {
        setDataInstitute(res.data.data)
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

  const getBranch = async () => {
    await apiBranch.all()
      .then((res) => {
        console.log(res.data.data)
        setBranch(res.data.data)
      })
  }

  const getDetail = async (id) => {
    await apiOperator.detail(id)
      .then((result) => {
        const res = result.data.data
        res.avatar ? setAvatar(instance.pathImg + res.avatar) : setAvatar('/asset/img/blank_profile.png')
        setValue("name", res.name)
        setValue("email", res.email)
        setValue("gender", res.gender)
        setValue("phone", res.phone)
        setValue("employee_id", res.email)
        if (res.branch_id) {
          getBranch()
          setValue("branch_id", res.branch_id)
        } else {
          setValue("branch_id", "Select Branch")
        }
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
    if (form.branch_id !== 'Select Branch') {
      data.append("branch_id", form.branch_id)
    }
    if (file) {
      data.append("avatar", file)
    }
    update ? await apiOperator.update(selectedData, data)
      .then((res) => {
        reset(res)
        onCloseCreateModal()
        getData(search, limit, page)
        onOpenSuccessModal()
        setAvatar('/asset/img/blank_profile.png')
        setFile(null)
      })
      .catch((err) => {
        setErrors(err.response.data.data)
        console.log(err)
      }) : await apiOperator.create(data)
        .then((res) => {
          reset(res)
          onCloseCreateModal()
          setUpdate(false)
          getData(search, limit, page)
          onOpenSuccessModal()
          setAvatar('/asset/img/blank_profile.png')
          setFile(null)
        })
        .catch((err) => {
          setErrors(err.response.data.data)
        })
    getData(search, limit, page)
  }

  const onDelete = async (id) => {
    await apiOperator.deleted(id)
      .then(() => {
        getData(search, limit, page)
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
      <div className="md:py-8 mt-24 md:mt-8">
        <Card
          title="Operator"
          right={(
            <div onClick={() => {
              setAvatar('/asset/img/blank_profile.png')
              getBranch()
              setUpdate(false)
              onOpenCreateModal()
              setErrors(null)
              reset()
            }}>
              <Button title="+ Add Operator" />
            </div>
          )}
        >
          <input type="text" className="p-2 border rounded w-1/2 mb-4" placeholder="Search Operator" onChange={(e) => {
            setSearch(e.target.value)
            getData(e.target.value, limit, page)
          }} />

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
                                <div>{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span>
                              {item.phone}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                              getDetail(item.id)
                              setSelectedData(item.id)
                              setUpdate(true)
                              onOpenCreateModal()
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
                <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} total={dataInstitute.total} doLimit={data => setLimit(data)} doData={getData} />
              </div>
            </div>
          </div>
        </Card>
      </div>


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{update ? 'Edit' : 'Add'} Operator</ModalHeader>
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
              <div className="w-full">
                <p>Full Name {errors && (
                  <span className="text-red-1 text-sm">{errors.name}</span>
                )}</p>
                <input type="text" className="w-full form border p-2 rounded" placeholder="Input Full Name" {...register("name")} />
              </div>

              <div className="flex gap-4 flex-col md:flex-row mt-4">
                <div className="w-full">
                  <p>Email {errors && (
                    <span className="text-red-1 text-sm">{errors.email}</span>
                  )}</p>
                  <input type="text" className="form border w-full p-2 rounded" placeholder="Input Email Address" {...register("email")} />
                </div>
                <div className="w-full">
                  <p>Phone{errors && (
                    <span className="text-red-1 text-sm">{errors.phone}</span>
                  )}</p>
                  <input type="number" className="form border w-full  p-2 rounded" placeholder="Input Phone Number" {...register("phone")} />
                </div>
              </div>

              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full">
                  <p className="mt-4">Password  {errors && (
                    <span className="text-red-1 text-sm">{errors.password}</span>
                  )}</p>
                  <div className="relative">
                    <input type={`${passwd ? 'password' : 'text'}`} {...register("password")} className="form w-full border p-2 rounded" placeholder="Input New Password" />
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
                <div className="w-full">
                  <p className="mt-4">Confirm Password  {errors && (
                    <span className="text-red-1 text-sm">{errors.password}</span>
                  )}</p>
                  <div className="relative">
                    <input type={`${passwdConfirmation ? 'password' : 'text'}`} {...register("password_confirmation")} className="form w-full border p-2 rounded" placeholder="Input New Password" />
                    <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                      passwdConfirmation ? setpasswdConfirmation(false) : setpasswd(true)
                    }}>
                      {passwdConfirmation ?
                        (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                        (<FaEye className=" z-10 inline-block align-middle" />)
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <Button title="Save" />
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
                <div onClick={() => {
                  onCloseSuccessModal()
                  setUpdate(false)
                }}>
                  <Button title="Okay" />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center> Delete Operator</center></ModalHeader>
          <ModalBody>
            <center className="mb-8">Are you sure to delete {nameDeleted} from Operator ?</center>
            <div className="flex gap-4 justify-center">
              <button className="text-black-4 p-3" mr={3} onClick={onClose}>
                Cancel
              </button>
              <div onClick={() => {
                onDelete(selectedData)
                onClose()
              }}>
                <Button title="Delete" /></div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
Operator.layout = Layout
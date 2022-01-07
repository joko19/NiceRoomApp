import Admin from "../../../Layout/Admin";
import Card from "../../../components/Cards/Card";
import apiInstitute from "../../../action/institute";
import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
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
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Pagination from "../../../components/Pagination/pagination";
import { region } from "../../../action/India";

export default function Institute() {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [update, setUpdate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cities, setCities] = useState([])
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
  const TableHead = ['Institute Name', 'State', ' City', 'Year Established', 'Action']
  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  const getData = async (search, limit, page) => {
    await apiInstitute.all(search, limit, page)
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

  const getDetail = async (id) => {
    await apiInstitute.detail(id)
      .then((result) => {
        const res = result.data.data
        setValue("name", res.name)
        setValue("address", res.address)
        setValue("state", res.state)
        setValue("establishment_year", res.establishment_year)
        setValue("pin_code", res.pin_code)
        const city = region.find(state => state.name === res.state).cities
        setCities(city)
        setValue("city", res.city)
      })
  }

  const onSubmit = async (data) => {
    if (data.state === 'Select State') {
      data.state = ''
    }
    if (data.city === 'Select City') {
      data.city = ''
    }
    update ? await apiInstitute.update(selectedData, data)
      .then((res) => {
        reset(res)
        onCloseCreateModal()
        onOpenSuccessModal()
      })
      .catch((err) => {
        setErrors(err.response.data.data)
        console.log(err)
      }) : await apiInstitute.create(data)
        .then((res) => {
          onCloseCreateModal()
          onOpenSuccessModal()
        })
        .catch((err) => {
          setErrors(err.response.data.data)
        })
    getData(search, limit, page)
  }

  const onDelete = async (id) => {
    await apiInstitute.deleted(id)
      .then(() => {
        getData(search, limit, page)
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
          title="Institution"
          right={(
            <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" onClick={() => {
              onOpenCreateModal()
              setErrors(null)
              reset()
            }}>
              + Create Institute
            </button>
          )}
        >
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Institute" onChange={(e) => {
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
                            <Link href={`/admin/institution/${item.id}`}>
                              <a className="text-indigo-600 hover:text-indigo-900">
                                <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon detail" />
                              </a>
                            </Link>
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
          <ModalHeader>{update ? 'Edit' : 'Create'} Institute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
              <div className="flex gap-4">
                <div className="w-full">
                  <p>Institute Name {errors && (
                    <span className="text-red-1 text-sm">{errors.name}</span>
                  )}</p>
                  <input type="text" className="w-full form border p-4 rounded-lg" placeholder="Input Institute Name" {...register("name")} />
                </div>
                <div className="w-full">
                  <p>Address {errors && (
                    <span className="text-red-1 text-sm">{errors.address}</span>
                  )}</p>
                  <input type="text" className="form border w-full p-4 rounded-lg" placeholder="Input Institute Address" {...register("address")} />
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
              <div className="flex gap-4">
                <div className="w-full">
                  <p className="mt-4">Establishment Year {errors && (
                    <span className="text-red-1 text-sm">{errors.establishment_year}</span>
                  )}</p>
                  <input type="text" className=" w-full form border p-4 rounded-lg" placeholder="Input Establishment Year" {...register("establishment_year")} />
                </div>
                <div className="w-full">
                  <p className="mt-4">Pin Code{errors && (
                    <span className="text-red-1 text-sm">{errors.pin_code}</span>
                  )}</p>
                  <input type="number" className="w-full form border p-4 rounded-lg" placeholder="Input 6-Digits Code Number" {...register("pin_code")} />
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
import { useState, useEffect } from "react";
import Admin from "../../Layout/Admin";
import Card from "../../components/Cards/Card";
import Image from "next/image";
import apiTopic from "../../action/topics";
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
import Pagination from "../../components/Pagination/pagination";


export default function Topics() {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [topics, setTopics] = useState([])
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)
  const {
    isOpen: isCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal
  } = useDisclosure()
  const { register, handleSubmit, setValue, getValues, reset } = useForm();


  const getData = async (search, limit, page) => {
    await apiTopic.all(search, limit, page)
      .then((res) => {
        console.log(res.data.data)
        setTopics(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(async() => {
    getData(search, limit, page)
  }, [])

  const onSubmit = async (data) => {
    update ? await apiTopic.update(selectedData, data)
      .then((res) => setUpdate(false)) :
      await apiTopic.create(data)
        .then((res) => getData(search, limit, page))
    getData(search, limit, page)
    onCloseCreateModal()
  }

  const onDelete = async (id) => {
    await apiTopic.deleted(id)
      .then((res) => {
        if (res.data.status) getTopics()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className="pt-24 md:py-24">
        <Card
          title="Topics"
          right={(
            <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" onClick={() => {
              setValue("name", "")
              onOpenCreateModal()
            }}>
              + Create Topic
            </button>
          )}
        >
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Topic" onChange={(e) => {
            setSearch(e.target.value)
            getData(e.target.value, limit, page)
          }} />

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table min-w-full divide-y divide-gray-200">
                    <thead className="bg-black-9" >
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Topic Name
                      </th>
                      <th scope="col" className="text-left px-6 tracking-wider py-3">
                        Action
                      </th>
                      {/* </tr> */}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => {
                                setValue("name", item.name)
                                setSelectedData(item.id)
                                setUpdate(true)
                                onOpenCreateModal()
                              }}>
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                            </button>
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
                <Pagination page={page} lastPage={topics.last_page} limit={limit} search={search} total={topics.total} doLimit={data => setLimit(data)} doData={getData}/>
              </div>
            </div>
          </div>
        </Card>
      </div>


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{update ? 'Update' : 'Create'} Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div>
                <p>Topic Name</p>
                <input type="text" className="form border w-full p-4 rounded-lg" placeholder="Input Topic Name" {...register("name", { required: true })} />
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" >Save Topic</button>
                <button type="button" className="text-black-4 p-3 rounded-lg" onClick={onCloseCreateModal}>Close</button>
              </div>
            </form>
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
              getData(search, limit, page)
              onClose()
            }} onClose={onClose}>Deleted</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
Topics.layout = Admin
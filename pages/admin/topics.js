import { useState, useEffect } from "react";
import Admin from "../../Layout/Admin";
import Card from "../../components/Cards/Card";
import Icon from "../../components/Button/Icon";
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


export default function Topics() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [topics, setTopics] = useState([])
  const {
    isOpen: isCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal
  } = useDisclosure()
  const { register, handleSubmit, setValue, getValues } = useForm();


  const getTopics = async () => {
    await apiTopic.all()
      .then((res) => {
        console.log(res.data.data.data)
        setTopics(res.data.data.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(async () => {
    getTopics()
  }, [])

  const onSubmit = async (data) => {
    console.log(data)
    const dataStr = JSON.stringify(data)
    await apiTopic.create(data)
      .then((res) => {
        getTopics()
        onCloseCreateModal()
      })
      .catch((err) => {
        console.log(err)
      })
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
      <div className="md:py-24">
        <Card
          title="Topics"
          right={(
            <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" onClick={onOpenCreateModal}>
              + Create Topic
            </button>
          )}
        >
          <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Topic" />

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
                      {topics.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
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


      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div>
                <p>Topic Name</p>
                <input type="text" className="form border w-full p-4 rounded-lg" placeholder="Input Topic Name" {...register("name", { required: true })} />
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" >Save Institute</button>
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
              onClose()
            }} onClose={onClose}>Deleted</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
Topics.layout = Admin
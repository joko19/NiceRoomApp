import Layout from "../../../Layout/Layout";
import Card from "../../../components/Cards/Card";
import apiPractice from "../../../action/practice";
import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import { HeaderInstruction } from "../../../components/Section/HeaderInstruction";

export default function Section({ data }) {
  const Router = useRouter()
  const { id } = Router.query
  const [dataExams, setDataExams] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal
  } = useDisclosure()
  const [listSection, setListSection] = useState({
    sections: []
  })
  const [selectedData, setSelectedData] = useState()
  const [selectedName, setSelectedName] = useState()
  const TableHead = ['No', 'Type Question', 'Number of Question', '+ Add Question']
  const [questionType, setQuestionType] = useState()
  const [questionSelectedId, setQuestionSelectedId] = useState()

  const getDetail = async () => {
    await apiPractice.detail(id)
      .then((result) => {
        setDataExams(result.data.data)
      })
    await apiPractice.detailSection(id)
      .then((res) => {
        setListSection(res.data.data)
      })

  }


  useEffect(() => {
    getDetail()
  }, [])

  const onDelete = async (idQuestion) => {
    await apiPractice.deleteQuestion(idQuestion)
      .then(() => {
        getDetail()
        onCloseDeleteModal()
      })
      .catch((err) => {
        // console.log(err)
      })
  }


  return (
    <>
    <div className="mt-12 text-sm">
      <Link href="/admin/practice">
        <a className="flex gap-4 text-blue-1 my-4"><FaAngleLeft /> Back</a>
      </Link>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ">List of test sessions <span className="text-blue-1">{dataExams.name}</span> </h1>
        <Link href={`edit/${id}`}>
          <a className=" p-4">
            <div className="flex  border border-blue-1 rounded p-2">
              <div className="m-auto text-blue-1">
                <Image src="/asset/icon/table/fi_edit.png" className="mr-4 my-auto" height={16} width={16} />
                <span className="ml-2">
                  Edit Practice
                </span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
      {listSection.sections.map((itemSection, index) => (
        <Card key={index} className="my-4">
        <HeaderInstruction itemSection={itemSection} index={index}/>
          <div className="flex flex-col text-sm">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table md:min-w-full overflow-auto divide-y divide-gray-200">
                    <thead className="bg-blue-6" >
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Type Question
                      </th>
                      <th scope="col" className="px-6 py-3 text-center tracking-wider">
                        Number of Question
                      </th>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        <div className="bg-blue-1 text-white w-48 text-center mx-auto p-4 rounded-lg cursor-pointer" onClick={() => {
                          setSelectedData(itemSection.id),
                            setSelectedName(itemSection.name)
                          onOpen()
                        }}>
                          + Add Question
                        </div>
                      </th>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {itemSection.questions.map((itemQuestion, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div>{index + 1}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {itemQuestion.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {itemQuestion.items_count} Question
                          </td>
                          <td className="flex gap-4 px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <div className="mx-auto flex gap-4">

                              <Link href={`/admin/practice/question/edit/${itemQuestion.id}`}>
                                <a className="text-indigo-600 hover:text-indigo-900">
                                  <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon Edit" />
                                  <span className="inline-block align-top">  Edit</span>
                                </a>
                              </Link>
                              <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                                setQuestionSelectedId(itemQuestion.id),
                                  onOpenDeleteModal()
                              }}>
                                <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" />
                                <span className="inline-block align-top">  Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <ModalDelete isOpen={isDeleteModal} onClose={onCloseDeleteModal} onDelete={(data) => onDelete(data)} selectedData={questionSelectedId} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question {selectedName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex gap-4">
              <div className={`${questionType === 'simple' ? 'text-blue-1 bg-blue-6 border-blue-1' : 'text-black-4 bg-black-9'} w-full text-center border py-12 cursor-pointer rounded-lg border`} onClick={() => setQuestionType('simple')}>
                Simple Question
              </div>
              <div className={`${questionType === 'paragraph' ? 'text-blue-1 bg-blue-6 border-blue-1' : 'text-black-4 bg-black-9'} w-full text-center border py-12 cursor-pointer rounded-lg border`} onClick={() => setQuestionType('paragraph')}>
                Paragraph Question
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 mt-4" >
              <Link href={`/admin/practice/section/${listSection.id}_id=${selectedData}#${questionType}`}>
                <a className="bg-blue-1 p-3 rounded-lg text-white">Select</a>
              </Link>
              <button type="button" className="text-black-4 p-3 rounded-lg" onClick={onClose}>Cancel</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}


// This also gets called at build time
export async function getServerSideProps(context) {
  return { props: {} }
}

Section.layout = Layout
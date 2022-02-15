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
import { useRouter } from "next/router";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import { ListSession } from "../../../components/Section/ListSession";
import Button, { BackButton } from "../../../components/Button/button";
import { TitleSection } from "../../../components/Section/TitleSection";

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
  const [questionType, setQuestionType] = useState()
  const [questionSelectedId, setQuestionSelectedId] = useState()
  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()


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

  const onPublish = async() => {
    await apiPractice.publish(id)
      .then(() => {
        onOpenSuccessModal()
      })
  }


  return (
    <div className="mt-12">
      <div className="text-sm">
        <BackButton url="/admin/practice" />
        <TitleSection dataExams={dataExams} id={id} type="Practice" />
      </div>
      {listSection.sections.map((itemSection, index) => (
        <ListSession key={index} index={index} idExamPractice={id} type="practice" itemSection={itemSection} onOpenDeleteModal={onOpenDeleteModal} setQuestionSelectedId={(data) => setQuestionSelectedId(data)} setSelectedData={(data) => setSelectedData(data)} setSelectedName={(data) => setSelectedName(data)} onOpen={onOpen} />
      ))}
      <div className="flex flex-row-reverse" onClick={onPublish}>
        <Button title="Publish" />
      </div>

      <ModalDelete isOpen={isDeleteModal} onClose={onCloseDeleteModal} onDelete={(data) => onDelete(data)} selectedData={questionSelectedId} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">Add Question {selectedName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex gap-4 text-sm">
              <div className={`${questionType === 'simple' ? 'text-blue-1 bg-blue-6 border-blue-1' : 'text-black-4 bg-black-9'} w-full text-center border py-12 cursor-pointer rounded-lg border`} onClick={() => setQuestionType('simple')}>
                Simple Question
              </div>
              <div className={`${questionType === 'paragraph' ? 'text-blue-1 bg-blue-6 border-blue-1' : 'text-black-4 bg-black-9'} w-full text-center border py-12 cursor-pointer rounded-lg border`} onClick={() => setQuestionType('paragraph')}>
                Paragraph Question
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 mt-4" >
              <Link href={`/admin/practice/section/${listSection.id}_id=${selectedData}#${questionType}`}>
                <a><Button title="Select" className="mt-4" /></a>
              </Link>
              <button type="button" className="text-black-4 p-4 rounded-lg" onClick={onClose}>Cancel</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Success Modal */}
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md"><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center text-sm"> Practice has published
              <div className="self-center">
                <Link href="/admin/practice">
                  <a> <Button title="Okay" className="mt-4" /></a>
                </Link>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}


// This also gets called at build time
export async function getServerSideProps(context) {
  return { props: {} }
}

Section.layout = Layout
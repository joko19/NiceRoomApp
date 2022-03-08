import Layout from "../../../Layout/Layout"
import apiStudentPage from "../../../action/student_page"
import { useState, useEffect } from "react";
import MainSlider from "../../../components/Slider/MainSlider"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import Button from "../../../components/Button/button";
import Image from "next/image";
import Multiselect from "multiselect-react-dropdown";

export default function Index() {
  const [dataPreferred, setDataPreferred] = useState([])
  const [liveExam, setLiveExam] = useState([])
  const [quiz, setQuiz] = useState([])
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [listPreferred, setListPreferred] = useState([])
  const [renderListPreferred, setRenderListPreferred] = useState(false)

  useEffect(async () => {
    const getPreferred = async () => {
      await apiStudentPage.examsPreferred(8)
        .then((res) => {
          console.log(res.data.data)
          setDataPreferred(res.data.data)
        })
    }
    const getLiveExam = async () => {
      await apiStudentPage.examsLiveTake(8)
        .then((res) => {
          setLiveExam(res.data.data)
          // setIsLoading(false)
        })
    }
    const getQuiz = async () => {
      await apiStudentPage.QuizAll(8, '')
        .then((res) => {
          setQuiz(res.data.data)
          // setIsLoading(false)
        })
    }
    const getNews = async () => {
      await apiStudentPage.examsLiveTake(8)
        .then((res) => {
          setNews(res.data.data)
          setIsLoading(false)
        })
    }
    getPreferred()
    getLiveExam()
    getQuiz()
    getNews()
  }, [])

  useEffect(() => {
    const getListPreferred = async () => {
      await apiStudentPage.preferred('')
        .then((res) => {
          console.log(res.data.data)
          setListPreferred(res.data.data)
        })
    }
    getListPreferred()
  }, [renderListPreferred])

  const onSelectPreferred = (list, item) => {
    setTopicItem(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("topics[]", arr)
  }


  const onRemovePreferred = async (id, index) => {
    let newArr = listPreferred
    newArr.splice(index, 1)
    setListPreferred([...newArr])

    // console.log(newArr)
    // const n = []
    // newArr.map((item) => {
    //   n.push(item.id)
    // })

    // const datatoSend = new FormData()
    // if (n) {
    //   for (let i = 0; i < n.length; i++) {
    //     const field = `exam_types[${i}]`
    //     datatoSend.append(`${field}`, n[i])
    //   }
    // }
    // console.log("data setelah dihapus")
    // const data = {
    //   exam_type : n
    // }
    // console.log(n)
    // console.log(data)
    //   await apiStudentPage.preferredExamStore(datatoSend)
    //     .then((res) => {
    //       setRenderListPreferred(!renderListPreferred)
    //     })
  }

  return (
    <div className="mt-12 min-w-full overflow-x-hidden">
      <div className="flex flex-row-reverse">
        <button className={`flex text-blue-1 border border-blue-1 py-2 px-4 font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl `} onClick={() => {
          setRenderListPreferred(!renderListPreferred)
          onOpen()
        }}>Edit Exam Preferrence</button>
      </div>
      {/* <input type="text" className="p-2 border text-sm rounded  md:ml-8 mb-4 md:w-1/2 w-full" placeholder="Search" /> */}
      {dataPreferred.length > 0 && (
        <MainSlider title="Your Preferred Exams" data={dataPreferred} urlSeeAll="/student/exams/preferred" type="exams" />
      )}
      <div className="my-8" />
      {liveExam.length > 0 && (
        <MainSlider title="Live Exams" isLive={true} data={liveExam} urlSeeAll="/student/exams/live" type="exams" />
      )}
      <div className="my-8" />
      {quiz.length > 0 && (
        <MainSlider title="Quizzes" data={quiz} urlSeeAll="/student/quizzes" type="quiz" />
      )}
      {!isLoading && (dataPreferred.length === 0 && liveExam.length === 0 && quiz.length === 0 && news.length === 0) && (
        <div className="text-center">Goals is Empty</div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="medium"><center>Preferred Exams</center> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
            <div className="w-1/2 p-2">
              <Multiselect
                className="z-100 "
                options={listPreferred}
                style={{
                  "multiselectContainer": {
                    // "height": '36px',
                    "padding": "4px",
                    "border-width": "1px",
                    "border-radius": "5px"
                  }, "searchBox": {
                    "border": "none",
                  }, "chips": {
                    "padding": "2px"
                  },
                }}
                placeholder="Select Preffered Exam"
                // singleSelect
                // options={listTag} // Options to display in the dropdown
                // selectedValues={topicItem} // Preselected value to persist in dropdown
                onSelect={onSelectPreferred} // Function will trigger on select event
                // onRemove={onRemoveTopic} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />

            </div>
              <div className="text-sm flex flex-wrap">
                {listPreferred.map((item, index) => (
                  <div key={index} className={`flex flex-wrap my-2 w-1/2 gap-4 p-2 text-sm cursor-pointer`} >
                    <div className={` bg-blue-6 flex  border rounded  w-full p-2 gap-2 justify-between`}>
                      <div className="flex gap-2">
                        <img className="w-8 h-8 my-auto" src="/asset/icon/table/ic_preferred.svg" />
                        <h1 className="font-bold my-auto">{item.name}</h1>
                      </div>
                      <button>
                        <Image src="/asset/icon/table/fi_trash-2.svg" width={16} height={16} alt="icon edit" onClick={() => {
                          onRemovePreferred(item.id, index)
                          onOpen()
                        }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </ModalBody>
          <ModalFooter>
            <button className="flex text-blue-1 border-blue-1 py-2 px-4 cursor-pointer font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl mr-4" onClick={onClose}>
              Discard
            </button>
            <div onClick={() => {
              onDelete(selectedData)
              onClose()
            }}><Button title="Close and Save" /></div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}


Index.layout = Layout
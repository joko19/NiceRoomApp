import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../../components/Cards/Card";
import Layout from "../../../../Layout/Layout";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import Quill from "../../../../components/Editor/Quill";
import { Select } from '@chakra-ui/react'
import apiQuiz from "../../../../action/quiz";
import apiTopic from "../../../../action/topics";
import { MyDTPicker } from "../../../../components/DateTime/DateTime";
import { useRouter } from "next/router";
import moment from 'moment';
import apiExam from "../../../../action/exam";

export default function Create(props) {
  const Router = useRouter()
  const { id } = Router.query
  const [file, setFile] = useState(null)
  const [coverName, setCoverName] = useState(null)
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Quiz Details', 'Instruction', 'Question']
  const [currentStep, setCurrentStep] = useState(3)
  const [topics, setTopics] = useState([])
  const [type, setType] = useState()
  const [instruction, setInstruction] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [consenment, setConsentment] = useState([])
  const [status, setStatus] = useState()
  const [answerType, setAnswerType] = useState([{
    isSingle: true
  }])
  const [questions, setQuestions] = useState([{
    id: '',
    question: '',
    level:'',
    answer_explanation:'',
    tag:'',
    answer_type: "single",
    options: [{
      id: 0,
      title: '',
      correct: 0
    }]
  }
  ])

  const getDetail = async () => {
    console.log("get data detail")
    await apiQuiz.detail(id)
      .then((res) => {
        const data = res.data.data
        console.log(data)
        console.log(data.consentments)
        if (data.consentments !== 'null') {
          const str = data.consentments.replace(/['"]+/g, '').slice(1)
          const myArr = str.slice(0, str.length - 1).split(", ")
          var arr = []
          for (let i = 0; i < myArr.length; i++) {
            arr.push(myArr[i])
          }
          setConsentment(arr)
        }
        setValue("name", data.name)
        setValue("duration", data.duration)
        setValue("type", data.type)
        setType(data.type)
        if (data.type === 'live') {
          setValue("topic_id", data.topic_id)
          setValue("start_time", data.start_time)
          setValue("end_time", data.end_time)
          setStartTime(data.start_time)
          setEndTime(data.end_time)
          console.log(data.start_time)
        }
        setInstruction(data.instruction)
        console.log(startTime)
        const req = res.data.data
        let dataQuestion = []
        let dataAnswerExplanation = []
        let dataAnswerType = []

        const myArr = []
        arr.push(res.data.data.questions)
        setQuestions([...myArr])
        console.log(arr)
        for (let i = 0; i < req.questions.length; i++) {
          const isSingle = req.questions[i].answer_type === 'single' ? true : false
          console.log(JSON.stringify(req.questions[i].question))
          dataQuestion.push({
            id: i,
            title: req.questions[i].question,
            tag: req.questions[i].tag,
            option: req.questions[i].options,
            answer_explanation: req.questions[i].answer_explanation
          })
          dataAnswerType.push({ isSingle: isSingle })
          dataAnswerExplanation.push({ data: req.questions[i].answer_explanation })

          console.log(req)
          const field = `questions[${i}]`
          setValue(`${field}[id]`, req.questions[i].id)
          setValue(`${field}[level]`, req.questions[i].level)
          setValue(`${field}[tag]`, req.questions[i].tag)
          setValue(`${field}[mark]`, req.questions[i].mark)
          setValue(`${field}[answer_type]`, req.questions[i].answer_type)
          setValue(`${field}[negative_mark]`, req.questions[i].negative_mark)
          setValue(`${field}[question]`, req.questions[i].question)
          setValue(`${field}[answer_explanation]`, req.questions[i].answer_explanation)
        }
        // setQuestions(dataQuestion)
        setAnswerType(dataAnswerType)
      })
  }

  const chooseImage = (e) => {
    setCoverName(e.target.files[0].name)
    // setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const getTopics = async () => {
    await apiTopic.all('', '', '')
      .then((res) => setTopics(res.data.data.data))
  }

  const submitQuiz = async (req) => {
    console.log("submit")
    console.log(req)
    setErrors("")
    const data = new FormData()
    if (file !== null) {
      data.append("image", file)
    }
    data.append("name", req.name)
    data.append("type", req.type)
    if (req.type === 'live') {
      data.append("topic_id", req.topic_id)
      req.start_time.split(":").length === 2 && data.append("start_time", req.start_time)
      req.end_time.split(":").length === 2 && data.append("end_time", req.end_time)
    }
    data.append("duration", req.duration)
    // to step 2
    if (currentStep === 1) {
      await apiQuiz.update(id, data)
        .then()
        .catch((err) => {
          setErrors(err.response.data.data)
          console.log(err.response.data.data)
          if (!err.response.data.data.name && !err.response.data.data.duration && !err.response.data.data.start_time && !err.response.data.data.end_time) {
            setErrors(null)
            setCurrentStep(2)
          }
          return;
        })
      return null
    }

    data.append("instruction", instruction)
    console.log(req.consentments)
    for (let i = 0; i < req.consenments.length; i++) {
      const field = `consentments[${i}]`
      data.append(`${field}`, req.consenments[i])
    }
    // to step 3
    if (currentStep === 2) {
      await apiQuiz.update(id, data)
        .then()
        .catch((err) => {
          setErrors(err.response.data.data)
          console.log(err.response.data.data)

          if (!err.response.data.data["consentments"] && !err.response.data.data.instruction) {
            setErrors(null)
            setCurrentStep(3)
          }
          return;
        })
      return null
    }
    console.log(req.questions.length)

    for (let i = 0; i < req.questions.length; i++) {
      console.log(req)
      const field = `questions[${i}]`
      console.log(req.questions[i].id)
      data.append(`${field}[id]`, req.questions[i].id === '' ? -1 : req.questions[i].id)
      data.append(`${field}[level]`, req.questions[i].level)
      data.append(`${field}[tag]`, req.questions[i].tag)
      data.append(`${field}[mark]`, req.questions[i].mark)
      data.append(`${field}[answer_type]`, req.questions[i].answer_type)
      data.append(`${field}[negative_mark]`, req.questions[i].negative_mark)
      data.append(`${field}[question]`, req.questions[i].question)
      data.append(`${field}[answer_explanation]`, req.questions[i].answer_explanation)
      let correct = []
      for (let j = 0; j < req.questions[i].option.length; j++) {
        console.log(req.questions[i].option[j].id)
        const opt = `${field}[options][${j}]`
        let isCorrect = null
        console.log(req.questions[i])
        if (typeof req.questions[i].correct === 'string') {
          const correctAnswer = req.questions[i].correct
          data.append(`${opt}[correct]`, correctAnswer == j ? 1 : 0)
        } else {
          data.append(`${opt}[correct]`, req.questions[i].option[j].correct === '1' ? 1 : 0)
        }
        data.append(`${opt}[title]`, req.questions[i].option[j].title)
        data.append(`${opt}[id]`, req.questions[i].option[j].id === 'NaN' || req.questions[i].option[j].id === '' ? -1 : req.questions[i].option[j].id)
        // data.append(`${opt}[deleted]`, "271")
      }

    }
    console.log(data)
    // const tag = Array.from(tags)
    // tag.forEach((item) => {
    //   data.append("tags"+, item)
    // })
    // for console log
    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    data.append("status", status)
    await apiQuiz.update(id, data)
      .then((res) => {
        onOpenSuccessModal()
      })
      .catch((err) => {
        console.log(err.response.data.data)
        setErrors(err.response.data.data)
      })
  }

  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()

  useEffect(() => {
    getDetail()
    getTopics()
  }, [currentStep]);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/admin/quizzes">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white overflow-visible"
        title="Edit Quiz " >
        <div className="flex gap-24 m-auto ">
          {step.map((item, index) => (
            <div key={index}>
              <div className="flex">
                <div className={` ${index < currentStep ? 'bg-blue-1 text-white' : 'border bg-white text-black-5'} px-4 py-3 m-auto rounded-lg `}>
                  {index + 1}
                </div>
                {index !== 2 && (
                  <div className="bg-red-100">
                    <Divider orientation="horizontal" />
                  </div>
                )}
              </div>
              <p className="text-blue-1 text-center mt-2">
                {index < currentStep && item}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(submitQuiz)}>
          {currentStep === 1 && (
            <div className="mb-8">
              {type === 'live' && (
                <div className="flex">
                  {coverName === null && (
                    <div className="flex p-8 border-dashed w-48 border-blue-1 h-48 mt-4 border-4 border-black self-center justify-center">
                      <input type="file" accept="image/*" className="hidden" id="file-input" onChange={chooseImage} />
                      <div className="m-auto">
                        <label htmlFor="file-input">
                          <center>
                            <Image src="/asset/icon/ic_upload.png" alt="icon upload" htmlFor="" width={24} height={24} className="m-auto cursor-pointer" />
                          </center>
                        </label>
                        <p className="text-center text-blue-1">Upload Image</p>
                      </div>
                    </div>
                  )}
                  {coverName !== null && (
                    <div className="p-8 border-dashed border-4 border-black self-center justify-center">
                      <center>
                        <span>{coverName}</span> <span className="text-red-1 rounded border p-1 border-red-1 hover:cursor-pointer" onClick={() => setCoverName(null)}>x</span>
                        {/* <label htmlFor="file-input">
         <Image src="/asset/icon/ic_upload.png" alt="icon upload" htmlFor="" width={24} height={24} className="mx-auto cursor-pointer" />
         <p className="text-center text-blue-1">Upload Image</p>
       </label> */}
                      </center>
                    </div>
                  )}
                  <div className="my-auto ml-4">
                    <p className="text-black-4">Maximum file size:</p>
                    <p className="font-bold">1 MB, image ration must be 1:1</p>
                  </div>
                </div>
              )}
              <div className="flex gap-4 ">
                <div className="w-full">
                  <p className="mt-4">Quiz Name {errors && (
                    <span className="text-red-1 text-sm">{errors.name}</span>
                  )}</p>
                  <div>
                    <input type="text" className="form border w-full rounded-lg p-4 h-full" placeholder="Input Quiz Name"  {...register("name")} />
                  </div>
                </div>
                {type === 'live' && (
                  <div className="w-full">
                    <p className="mt-4">Topic {errors && (
                      <span className="text-red-1 text-sm">{errors.topic}</span>
                    )}</p>
                    <div>
                      <select className="form w-full border bg-white p-4 h-full rounded-lg" placeholder="Choose Type" {...register("topic_id")} >
                        {topics.map((item, index) => (
                          <option key={index} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4" >
                <div className="w-full">
                  <p className="mt-4">Type {errors && (
                    <span className="text-red-1 text-sm">{errors.type}</span>
                  )}</p>
                  <div>
                    <select className="form w-full border h-full bg-white p-4 rounded-lg" placeholder="Choose Type" onClick={(e) => {
                      setType(e.target.value)
                    }} {...register("type")} >
                      <option value="mixed">Mixed Quiz</option>
                      <option value="live">Live Quiz</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <p className="mt-4">Duration (Can be 0) {errors && (
                    <span className="text-red-1 text-sm">{errors.duration}</span>
                  )}</p>
                  <div >
                    <div className="flex h-full">
                      <input type="number" className="border w-full h-full flex-grow rounded p-4" placeholder="0"  {...register("duration")} />
                      <input className="bg-black-9 p-4 w-24 text-center h-full border text-black-4" placeholder="Minute" disabled />
                    </div>
                  </div>
                </div>
              </div>

              {type === 'live' && (
                <div className="flex mt-4 gap-4">
                  <div className="w-full">
                    <p>Start Time {errors && (
                      <span className="text-red-1 text-sm">{errors.start_time}</span>
                    )}</p>
                    <MyDTPicker data={getValues("start_time")} setDate={(data) => setStartTime(data)} />
                  </div>
                  <div className="w-full">
                    <p>End Time {errors && (
                      <span className="text-red-1 text-sm">{errors.end_time}</span>
                    )}</p>
                    <MyDTPicker data={getValues("end_time")} setDate={(data) => setEndTime(data)} />
                  </div>
                </div>
              )}
            </div>
          )}


          {currentStep === 2 && (
            <>
              <p className="mt-4">Instruction {errors && (
                <span className="text-red-1 text-sm">{errors['instruction']}</span>
              )}</p>
              <div className="w-full h-64">
                <Quill className="h-48" data={instruction} setData={(data) => setInstruction(data)} />
              </div>
              <p className="mt-4">Consentment</p>
              {consenment.map((item, index) => (
                <>{errors && (
                  <span className="text-red-1 text-sm">{errors[`consentments.${index}`]}</span>
                )}
                  <div key={index} className="flex">
                    <input key={index} type="text" className="form border w-full rounded-lg p-4 h-full m-1" autoComplete="off" placeholder="Input Consentment" defaultValue={item} {...register(`consenments[${index}]`)} />
                    {consenment.length > 1 && (
                      <div className="m-auto cursor-pointer text-blue-1 -ml-8" onClick={() => {
                        setConsentment(prevIndex => [...prevIndex.filter(i => i !== item)])
                        unregister(`consenments[${index}]`)
                      }} >x</div>
                    )}
                  </div>
                </>
              ))}
              <div onClick={() => setConsentment([...consenment, ""])} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Consent</div>
            </>
          )}

          {currentStep === 3 && (
            <div className="mt-8">
              <div className="bg-blue-6 p-4">
                {questions.map((eachQuestion, indexEachQuestion) => {
                  console.log(indexEachQuestion)
                  return (
                    <div className={`bg-white p-4 mt-8`} key={indexEachQuestion}>
                      <div className="font-bold text-xl">    Question {indexEachQuestion + 1}</div>

                     
                     
                  
                    </div>
                  )
                })}

              </div>
              
              <div onClick={() => {
                const newQuestionItem = {
                  id: questions[questions.length - 1].id + 1,
                  question: '',
                  new:true,
                  answer_type: 'single',
                  options: [{
                    id: 0,
                    title: '',
                    correct: 0,
                    new: true
                  }]
                }
                // setQuestions([...questions, newQuestionItem])
              }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Question</div>
            </div>
          )}
          <div className="flex -z-10 gap-4 flex-row-reverse my-4">
            {currentStep < 3 && (<button className={`${3 > currentStep ? 'cursor-pointer' : 'cursor-default'} bg-blue-1  text-white p-4 rounded-lg`}>Next Step</button>
            )}
            {currentStep === 3 && (
              <>
                <button onClick={() => setStatus("published")} className='cursor-pointer bg-blue-1  text-white p-4 rounded-lg'>Save Quiz</button>
                <button onClick={() => setStatus("draft")} className='cursor-pointer text-blue-1 p-4 rounded-lg'>Save Question</button>
              </>
            )}
            <div onClick={() => {
              currentStep > 1 && setCurrentStep(currentStep - 1)
            }} className={`${1 < currentStep ? 'cursor-pointer' : 'cursor-default'}  text-black-4 p-4 rounded-lg`}>Back Step</div>
          </div>
        </form>
      </Card>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center ">
              {status === 'published' ?
                (
                  <p> Quiz has published </p>
                ) : (

                  <p>Quiz saved as Draft </p>
                )
              }
              <div className="self-center">
                <Link href="/admin/quizzes">
                  <a className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3">Okay</a>
                </Link>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div >
  )
}


Create.layout = Layout
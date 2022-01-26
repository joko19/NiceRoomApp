import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../components/Cards/Card";
import Layout from "../../../Layout/Layout";
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
import Quill from "../../../components/Editor/Quill";
import { Select } from '@chakra-ui/react'
import apiQuiz from "../../../action/quiz";
import apiTopic from "../../../action/topics";
import { MyDTPicker } from "../../../components/DateTime/DateTime";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

export default function Create(props) {
  const FormikRef = useRef();
  const [file, setFile] = useState(null)
  const [coverName, setCoverName] = useState(null)
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Quiz Details', 'Instruction', 'Question']
  const [currentStep, setCurrentStep] = useState(1)
  const [topics, setTopics] = useState([])
  const [type, setType] = useState()
  const [instruction, setInstruction] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [consenment, setConsentment] = useState([0])
  const [status, setStatus] = useState()
  const [answerType, setAnswerType] = useState([{
    isSingle: true
  }])

  const initialValues = {
    initialValues: {
      name: '',
      duration: '',
      type: '',
      topic_id: '',
      start_time: '',
      end_time: '',
      image: "",
      instruction: "",
      consenments: [],
      questions: [{
        level: '',
        tag: '',
        question: '',
        answer_type: '',
        answer_explanation: '',
        mark: '',
        negative_mark: '',
        options: [{
          title: '',
          correct: ''
        }]
      }]
    }
  }

  const [questions, setQuestions] = useState([
    {
      id: 0,
      // option: [1]
      option: [
        {
          id: 0,
          correct: 0,
        }
      ]
    },
  ])

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
      data.append("start_time", startTime)
      data.append("end_time", endTime)
    }
    data.append("duration", req.duration)
    // to step 2
    if (currentStep === 1) {
      await apiQuiz.create(data)
        .then()
        .catch((err) => {
          setErrors(err.response.data.data)
          console.log(err.response.data.data)
          if (!err.response.data.data.name && !err.response.data.data.duration) {
            setErrors(null)
            setCurrentStep(2)
          }
          return;
        })
      return null
    }

    data.append("instruction", instruction)
    for (let i = 0; i < req.consenments.length; i++) {
      const field = `consentments[${i}]`
      data.append(`${field}`, req.consenments[i])
    }
    // to step 3
    if (currentStep === 2) {
      await apiQuiz.create(data)
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

    for (let i = 0; i < req.questions.length; i++) {
      console.log(req)
      const field = `questions[${i}]`
      data.append(`${field}[level]`, req.questions[i].level)
      data.append(`${field}[tag]`, req.questions[i].tag)
      data.append(`${field}[mark]`, req.questions[i].mark)
      data.append(`${field}[answer_type]`, req.questions[i].answer_type)
      data.append(`${field}[negative_mark]`, req.questions[i].negative_mark)
      data.append(`${field}[question]`, req.questions[i].question)
      data.append(`${field}[answer_explanation]`, req.questions[i].answer_explanation)
      let correct = []
      console.log(typeof req.questions[i].correct)
      for (let j = 0; j < req.questions[i].option.length; j++) {
        const opt = `${field}[options][${j}]`
        let isCorrect = null
        console.log(req.questions[i])
        if (req.questions[i].correct.length === req.questions[i].option.length) {
          if (req.questions[i].correct[j] !== null) {
            isCorrect = 1
          } else {
            isCorrect = 0
          }
          data.append(`${opt}[correct]`, isCorrect)
        } else {
          const correctAnswer = req.questions[i].correct
          data.append(`${opt}[correct]`, correctAnswer == j ? 1 : 0)
        }
        data.append(`${opt}[title]`, req.questions[i].option[j].title)
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
    await apiQuiz.create(data)
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
    getTopics()
  }, []);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
  });

  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/admin/quizzes">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white overflow-visible"
        title="Create New Quiz " >
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
        <Formik
          initialValues={initialValues}
          onSubmit={submitQuiz}
          innerRef={FormikRef}
          validationSchema={validationSchema}>
          {({ values, setFieldValue, errors, touched, isSubmitting }) => (
            <Form>
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
                        <input type="text" className="form border w-full rounded-lg p-4 h-full" placeholder="Input Quiz Name"  />

                          <Field
                        
                            // as={
                            //   <input type="text" className="form border w-full rounded-lg p-4 h-full" placeholder="Input Quiz Name"  />}
                            variant="outlined"
                            name="title"
                            placeholder="Masukkan Judul Kuis"
                            fullWidth
                            error={errors.title && touched.title}
                            helperText={<ErrorMessage name="title" />}
                          />
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
                        <p>Start Time</p>
                        <MyDTPicker data={startTime} setDate={(data) => setStartTime(data)} />
                      </div>
                      <div className="w-full">
                        <p>End Time</p>
                        <MyDTPicker data={endTime} setDate={(data) => setEndTime(data)} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>
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
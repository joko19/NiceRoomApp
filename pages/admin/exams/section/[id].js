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
export default function Create(props) {
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
        if (typeof req.questions[i].correct === 'string') {
          const correctAnswer = req.questions[i].correct
          data.append(`${opt}[correct]`, correctAnswer == j ? 1 : 0)
        } else {
          data.append(`${opt}[correct]`, req.questions[i].option[j].correct === '1' ? 1 : 0)
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

  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/admin/quizzes">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white overflow-visible"
        title="Create New Quiz " >
        <form onSubmit={handleSubmit(submitQuiz)}>

            <div className="mt-8">
              <div className="bg-blue-6 p-4">
                {questions.map((itemQuestion, indexQuestion) => {
                  return (
                    <>
                      <p className="font-bold mt-4 text-lg">Question {indexQuestion + 1}</p>
                      <div className="flex gap-4">
                        <div className="w-full">
                          <p className="mt-4">Difficulty Level {errors && (
                            <span className="text-red-1 text-sm">{errors.type}</span>
                          )}</p>
                          <Select bg='white' {...register(`questions[${indexQuestion}].level`)} size="lg" variant='outline' iconColor="blue">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </Select>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Tag</p>
                          <Select bg='white' {...register(`questions[${indexQuestion}].tag`)} size="lg" variant='outline' iconColor="blue">
                            <option value="tag 1">tag 1</option>
                            <option value="tag 2">tag 2</option>
                            <option value="tag 3">tag 3</option>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Question {errors && (
                          <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.question`]}</span>
                        )}</p>
                        <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >

                          {/* <textarea {...register(`questions[${indexQuestion}].question`)} /> */}
                          <Quill className="h-32   border-none rounded-lg" data={getValues(`questions[${indexQuestion}].question`)} register={(data) => setDataForm(`questions[${indexQuestion}].question`, data)} />
                        </div>
                        <div className="bg-white h-12">
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Answer Type {errors && (
                          <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.options`]}</span>
                        )}</p>
                        <Select bg='white' onClick={(e) => {
                          console.log(answerType[indexQuestion])
                          let isSingle = ''
                          if (e.target.value === 'single')
                            isSingle = true
                          else
                            isSingle = false
                          let newArr = [...answerType]
                          newArr[indexQuestion] = {
                            isSingle: isSingle
                          }
                          setAnswerType(newArr)
                        }} {...register(`questions[${indexQuestion}].answer_type`)} size="lg" variant='outline' iconColor="blue">
                          <option value="single">Single Correct Answer</option>
                          <option value="multiple">Multiple Correct Answer</option>
                        </Select>

                        {questions[indexQuestion].option.map((itemAnswer, indexAnswer) => {
                          const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                          return (
                            <div className=" bg-white my-2  p-4 rounded-lg" key={indexAnswer}>
                              {errors && (
                                <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.options.${indexAnswer}.title`]}</span>
                              )}
                              <div className="flex gap-2">
                                {answerType[indexQuestion].isSingle ? (
                                  <input className="m-auto" type="radio" id="html" {...register(answerType[indexQuestion].isSingle ? `questions[${indexQuestion}].correct` : `questions[${indexQuestion}].correct[${indexAnswer}]`)} value={`${indexAnswer}`} />
                                ) : (
                                  <input className="m-auto" type="checkbox" id="html" {...register(`questions[${indexQuestion}].option[${indexAnswer}].correct`)} value="1" />
                                )}
                                <span className="m-auto">{alphabet[indexAnswer]}</span>
                                <input {...register(`questions[${indexQuestion}].option[${indexAnswer}].title`)} autoComplete="off" type="text" className="form border w-full rounded-lg p-4 h-full m-1" placeholder="Input your answer" />
                                {questions[indexQuestion].option.length !== 1 && (<div className="m-auto cursor-pointer text-blue-1 -ml-9" onClick={() => {
                                  const newOption = {
                                    id: itemQuestion.id,
                                    option: [...questions[itemQuestion.id].option.filter(i => i !== itemAnswer)]
                                  }
                                  const nQuestions = questions.map((obj) => (obj.id === itemQuestion.id ? newOption : obj))
                                  setQuestions(nQuestions)
                                  // setQuestions(prevIndex => [...prevIndex.filter(i => i !== item)])
                                  unregister(`consenments[${indexAnswer}]`)
                                }} >
                                  <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon delete" />
                                </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                        <div onClick={() => {
                          const newOption = {
                            id: itemQuestion.id,
                            option: [...questions[itemQuestion.id].option, {
                              id: questions[indexQuestion].option[questions[indexQuestion].option.length - 1].id + 1,
                              correct: 0
                            }]
                          }
                          const nQuestions = questions.map((obj) => (obj.id === itemQuestion.id ? newOption : obj))
                          setQuestions(nQuestions)
                        }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Answer</div>


                        <div className="mt-4">
                          <p className="mt-4">Answer Explanation {errors && (
                            <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.answer_explanation`]}</span>
                          )}</p>
                          <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                            <Quill className="h-32   border-none rounded-lg" data={getValues(`questions[${indexQuestion}].answer_explanation`)} register={(data) => setDataForm(`questions[${indexQuestion}].answer_explanation`, data)} />
                          </div>
                          <div className="bg-white h-12">
                          </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                          <div className="w-full">
                            <p className="mt-4">Marks {errors && (
                              <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.mark`]}</span>
                            )}</p>
                            <input type="number" className=" w-full form border p-4 rounded-lg" placeholder="0" {...register(`questions[${indexQuestion}].mark`)} />
                          </div>
                          <div className="w-full">
                            <p className="mt-4">Negative Marking {errors && (
                              <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.negative_mark`]}</span>
                            )}</p>
                            <input type="number" className="w-full form border p-4 rounded-lg" placeholder="0" {...register(`questions[${indexQuestion}].negative_mark`)} />
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
                )}

              </div>
              <div onClick={() => {
                setQuestions([...questions, { id: questions[questions.length - 1].id + 1, option: [0] }])
                setAnswerType([...answerType, { isSingle: true }])
              }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Question</div>
            </div>
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
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../../../components/Cards/Card";
import Layout from "../../../../../Layout/Layout";
import {useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import Quill from "../../../../../components/Editor/Quill";
import { Select } from '@chakra-ui/react'
import apiExam from "../../../../../action/exam";
import { useRouter } from "next/router";

export default function Edit(props) {
  const Router = useRouter()
  const { id } = Router.query
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const [status, setStatus] = useState()
  const [questionType, setQuestionType] = useState()
  const [idSection, setIdSection] = useState()
  const [number, setNumber] = useState([1, 2, 3])
  const [firstNumber, setFirstNumber] = useState(0)

  const [questions, setQuestions] = useState([
    {
      id: 0,
      instruction: "",
      type: "",
      items: [{
        id: 0,
        question: '',
        answer_type: "single",
        options: [{
          id: 0,
          title: '',
          correct: 0
        }]
      }]
    },
  ])

  const getDetail = useCallback(async (id) => {
    await apiExam.detailQuestion(id)
      .then((res) => {
        const arr = []
        arr.push(res.data.data)
        setQuestions([...arr])
        console.log(res.data.data)
        const data = res.data.data
        setValue("section_id", data.id)
        setValue("type", data.type)
        setValue(`level`, data.level)
        setValue(`tag`, data.tag)
        setValue(`instruction`, data.instruction)
        setValue(`paragraph`, data.paragraph)
        for (let i = 0; i < data.items.length; i++) {
          const field = `question_items[${i}]`
          setValue(`${field}[id]`, data.items[i].id)
          setValue(`${field}[mark]`, data.items[i].mark)
          setValue(`${field}[tag]`, data.items[i].tag)
          setValue(`${field}[level]`, data.items[i].level)
          setValue(`${field}[answer_type]`, data.items[i].answer_type)
          setValue(`${field}[negative_mark]`, data.items[i].negative_mark)
          setValue(`${field}[question]`, data.items[i].question)
          setValue(`${field}[answer_explanation]`, data.items[i].answer_explanation)
          for (let j = 0; j < data.items[i].options.length; j++) {
            const fieldOption = `question_items[${i}].options[${j}]`
            const id = data.items[i].options[j].id.toString()

            setValue(`${fieldOption}[id]`, id)
            setValue(`${fieldOption}[title]`, data.items[i].options[j].title)
            setValue(`${fieldOption}[correct]`, data.items[i].options[j].correct)
          }
        }
      })
  }, [])

  const submitQuiz = async (data) => {
    console.log(data)
    if (data.type === 'simple') {
      console.log("simple question")
      delete data.paragraph
      delete data.instruction
      delete data.tag
      delete data.level
    }
    await apiExam.updateQuestion(id, data)
      .then((res) => {
        onOpenSuccessModal()
        console.log(res.data.data)
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

  useEffect(async () => {
    getDetail(id)
  }, []);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  const onRemoveData = (identifier) => {
    unregister(identifier)
    setValue(identifier, "")
  }

  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/operator/exams">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white overflow-visible" >
        <form onSubmit={handleSubmit(submitQuiz)}>
          {questions.map((itemQuestion, indexQuestion) => {
            return (
              <div className="bg-blue-6 p-4" key={indexQuestion}>
                {itemQuestion.type === 'paragraph' && (
                  <>
                    <div className="flex justify-between mt-2">
                      <div className="text-2xl font-bold">Edit {itemQuestion.type === 'simple' ? 'Simple' : 'Paragraph'} Question</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-full">
                        <p className="mt-4">Difficulty Level {errors && (
                          <span className="text-red-1 text-sm">{errors[`level`]}</span>
                        )}</p>
                        <Select bg='white' {...register(`level`)} size="lg" variant='outline' iconColor="blue">
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </Select>
                      </div>
                      <div className="w-full">
                        <p className="mt-4">Tag</p>
                        <Select bg='white' {...register(`tag`)} size="lg" variant='outline' iconColor="blue">
                          <option value="tag 1">tag 1</option>
                          <option value="tag 2">tag 2</option>
                          <option value="tag 3">tag 3</option>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mt-4">Instruction {errors && (
                        <span className="text-red-1 text-sm">{errors[`instruction`]}</span>
                      )}</p>
                      <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                        {/* <textarea {...register(`question`)} /> */}
                        <Quill className="h-32   border-none rounded-lg" data={itemQuestion.instruction} register={(data) => setDataForm(`instruction`, data)} />
                      </div>
                      <div className="bg-white h-12">
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mt-4">Paragraph {errors && (
                        <span className="text-red-1 text-sm">{errors[`paragraph`]}</span>
                      )}</p>
                      <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                        {/* <textarea {...register(`question`)} /> */}
                        <Quill className="h-32   border-none rounded-lg" data={itemQuestion.paragraph} register={(data) => setDataForm(`paragraph`, data)} />
                      </div>
                      <div className="bg-white h-12">
                      </div>
                    </div>
                  </>
                )}



                {/* question */}
                {itemQuestion.items.map((eachQuestion, indexEachQuestion) => {

                  setValue("id", eachQuestion.id !== -1 ? eachQuestion.id : -1)
                  return (
                    <div className={`bg-white p-4 ${itemQuestion.type === "paragraph" && 'mt-8'}`} key={indexEachQuestion}>
                      <input defaultValue={eachQuestion.id} hidden {...register(`question_items[${indexEachQuestion}].id`)} />
                      {itemQuestion.type === "paragraph" && (
                        <div className="flex justify-between mt-2 bg-white">
                          <div className="text-2xl ">{indexEachQuestion + 1}. Question</div>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <div className="w-full">
                          <p className="mt-4">Difficulty Level {errors && (
                            <span className="text-red-1 text-sm">{errors.type}</span>
                          )}</p>
                          <Select bg='white' {...register(`question_items[${indexEachQuestion}].level`)} size="lg" variant='outline' iconColor="blue">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </Select>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Tag</p>
                          <Select bg='white' {...register(`question_items[${indexEachQuestion}].tag`)} size="lg" variant='outline' iconColor="blue">
                            <option value="tag 1">tag 1</option>
                            <option value="tag 2">tag 2</option>
                            <option value="tag 3">tag 3</option>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Question {errors && (
                          <span className="text-red-1 text-sm">{errors[`question_items.${indexEachQuestion}.question`]}</span>
                        )}</p>
                        <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                          <Quill className="h-32   border-none rounded-lg" data={eachQuestion.question} register={(data) => setDataForm(`question_items[${indexEachQuestion}].question`, data)} />
                        </div>
                        <div className="bg-white h-12">
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Answer Type {errors && (
                          <span className="text-red-1 text-sm">{errors[`options`]}</span>
                        )}</p>
                        <Select bg='white' onClick={(e) => {

                          const temp = questions
                          temp.map((itemQ) => {
                            if (itemQ.id === itemQuestion.id) {
                              itemQ.items.map((b) => {
                                if (b.id === eachQuestion.id) {
                                  b.answer_type = e.target.value
                                  const n = b.options.length
                                  for (let i = 0; i < n; i++) {
                                    b.options[i].correct = 0
                                    setValue(`question_items[${indexEachQuestion}].options[${i}].correct`, 0)
                                  }
                                }
                              })
                            } else {
                              itemQ
                            }
                          })
                          setQuestions([...temp])
                        }} {...register(`question_items[${indexEachQuestion}].answer_type`)} size="lg" variant='outline' iconColor="blue">
                          <option value="single">Single Correct Answer</option>
                          <option value="multiple">Multiple Correct Answer</option>
                        </Select>
                        {errors && (
                          <span className="text-red-1 text-sm">{errors[`question_items.${indexEachQuestion}.options.0.correct`]}</span>
                        )}
                        {eachQuestion.options.map((itemAnswer, indexAnswer) => {
                          const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                          if (itemAnswer.new) {
                            setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].id`, "-1")
                            console.log(itemAnswer.correct)
                            if (itemAnswer.correct === null) {
                              setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`, "0")
                            }
                          } else {
                            setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].id`, itemAnswer.id.toString())
                          }
                          return (
                            <div className={`${itemAnswer.correct === 1 ? 'bg-blue-6 border-blue-1' : 'bg-white'} my-2  p-4 border rounded-lg`} key={indexAnswer}>
                              {errors && (
                                <span className="text-red-1 text-sm">{errors[`question_items.${indexEachQuestion}.options.${indexAnswer}.title`]}</span>
                              )}
                              <div className='flex gap-2'>
                                {eachQuestion.answer_type === 'single' ? (
                                  <div className="flex cursor-pointer" onClick={() => {
                                    const temp = questions
                                    temp.map((itemQ) => {
                                      if (itemQ.id === itemQuestion.id) {
                                        itemQ.items.map((b) => {
                                          if (b.id === eachQuestion.id) {
                                            b.options.map((optionQ) => {
                                              if (optionQ.id === itemAnswer.id) {
                                                optionQ.correct = 1
                                                setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`, 1)
                                              } else {
                                                for (let i = 0; i < b.options.length; i++) {
                                                  if (i !== indexAnswer) {
                                                    optionQ.correct = 0
                                                    setValue(`question_items[${indexEachQuestion}].options[${i}].correct`, 0)
                                                  }
                                                }

                                              }
                                            })
                                          }
                                        })
                                      } else {
                                        itemQ
                                      }
                                    })
                                    setQuestions([...temp])
                                  }}>
                                    <div className="m-auto" >
                                      {itemAnswer.correct === 1 ? (
                                        <Image src='/asset/icon/table/ic_radio_active.png' width={16} height={16} />
                                      ) : (
                                        <div className="border w-4 rounded-full h-4" />
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  // if multiple answer
                                  <div className="flex cursor-pointer" onClick={() => {
                                    const temp = questions
                                    temp.map((itemQ) => {
                                      if (itemQ.id === itemQuestion.id) {
                                        itemQ.items.map((b) => {
                                          if (b.id === eachQuestion.id) {
                                            b.options.map((optionQ) => {
                                              if (optionQ.id === itemAnswer.id) {
                                                const tempCorrect = !optionQ.correct
                                                optionQ.correct = tempCorrect ? 1 : 0
                                                setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`, tempCorrect ? 1 : 0)
                                              }
                                            })
                                          }
                                        })
                                      } else {
                                        itemQ
                                      }
                                    })
                                    setQuestions([...temp])
                                  }}>
                                    <div className="m-auto" >
                                      {itemAnswer.correct === 1 ? (
                                        <Image src='/asset/icon/table/ic_checkbox_active.png' width={16} height={16} />
                                      ) : (
                                        <div className="border w-4 rounded h-4" />
                                      )}
                                    </div>
                                  </div>

                                  // <input className="m-auto" type="checkbox" id="html" {...register(`question_items[${indexEachQuestion}].options[${indexAnswer}].correct`)} value="1" />
                                )}
                                <span className="m-auto">{alphabet[indexAnswer]}</span>
                                <input value={itemAnswer.title} onChange={(e) => {

                                  const temp = questions
                                  temp.map((itemQ) => {
                                    if (itemQ.id === itemQuestion.id) {
                                      itemQ.items.map((b) => {
                                        if (b.id === eachQuestion.id) {
                                          b.options.map((optionQ) => {
                                            if (optionQ.id === itemAnswer.id) {
                                              const tempCorrect = !optionQ.correct
                                              optionQ.title = e.target.value
                                              setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].title`, e.target.value)
                                            }
                                          })
                                        }
                                      })
                                    } else {
                                      itemQ
                                    }
                                  })
                                  setQuestions([...temp])
                                }}
                                  // {...register(`question_items[${indexEachQuestion}].options[${indexAnswer}].title`)} 
                                  autoComplete="off" type="text" className={`${itemAnswer.correct === 1 ? 'bg-blue-6 text-black-5' : 'bg-white'} form border w-full rounded-lg p-4 h-full m-1`} placeholder="Input your answer" />
                                {eachQuestion.options.length !== 1 && (
                                  <div className="m-auto cursor-pointer text-blue-1 -ml-9" onClick={() => {
                                    const temp = questions
                                    temp.map((itemQ) => {
                                      if (itemQ.id === itemQuestion.id) {
                                        itemQ.items.map((b) => {
                                          if (b.id === eachQuestion.id) {
                                            b.options = [...b.options.filter(i => i !== itemAnswer)]
                                          }
                                        })
                                      } else {
                                        itemQ
                                      }
                                    })
                                    setValue(`question_items[${indexEachQuestion}].options[${indexAnswer}].deleted`, 1)
                                    setQuestions([...temp])
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
                            id: eachQuestion.options[eachQuestion.options.length - 1].id + 1,
                            title: '',
                            correct: null,
                            new: true
                          }
                          const temp = questions
                          temp.map((itemQ) => {
                            if (itemQ.id === itemQuestion.id) {
                              itemQ.items.map((b) => {
                                if (b.id === eachQuestion.id) {
                                  b.options = [...b.options, newOption]
                                }
                              })
                            } else {
                              itemQ
                            }
                          })
                          setQuestions([...temp])
                        }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Answer</div>
                        <div className="mt-4">
                          <p className="mt-4">Answer Explanation {errors && (
                            <span className="text-red-1 text-sm">{errors[`question_items.${indexEachQuestion}.answer_explanation`]}</span>
                          )}</p>
                          <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                            <Quill className="h-32   border-none rounded-lg" data={eachQuestion.answer_explanation} register={(data) => setDataForm(`question_items[${indexEachQuestion}].answer_explanation`, data)} />
                          </div>
                          <div className="bg-white h-12">
                          </div>
                        </div>

                        <div className="flex gap-4 mb-4">
                          <div className="w-full">
                            <p className="mt-4">Marks {errors && (
                              <span className="text-red-1 text-sm">{errors[`question_items.${indexEachQuestion}.mark`]}</span>
                            )}</p>
                            <input type="number" className=" w-full form border p-4 rounded-lg" placeholder="0" {...register(`question_items[${indexEachQuestion}].mark`)} />
                          </div>
                          <div className="w-full">
                            <p className="mt-4">Negative Marking {errors && (
                              <span className="text-red-1 text-sm">{errors[`question_items.${indexEachQuestion}.negative_mark`]}</span>
                            )}</p>
                            <input type="number" className="w-full form border p-4 rounded-lg" placeholder="0" {...register(`question_items[${indexEachQuestion}].negative_mark`)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {itemQuestion.type === 'paragraph' && (<div className="mt-8">
                  <div onClick={() => {
                    const newQuestionItem = {
                      id: -1,
                      question: '',
                      answer_type: 'single',
                      options: [{
                        id: 0,
                        title: '',
                        correct: 0,
                        new: true
                      }]
                    }
                    const temp = questions
                    temp.map((a) => {
                      if (a.id === itemQuestion.id) {
                        a.items = [...a.items, newQuestionItem]
                      } else {
                        a
                      }
                    })
                    setQuestions([...temp])
                  }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Question for this paragraph</div>
                </div>

                )}

              </div>
            )
          })}
          <div className="flex -z-10 gap-4 flex-row-reverse my-4">
            <button className='cursor-pointer bg-blue-1  text-white p-4 rounded-lg'>Save Question</button>

            <Link href="/operator/exams">
              <a className="flex gap-4 text-blue-1">
                <div onClick={() => setStatus("draft")} className='cursor-pointer text-blue-1 p-4 rounded-lg'>Cancel</div>
              </a>
            </Link>
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
              Successfully Update Question
              <div className="self-center">
                <Link href={`/operator/exams/`}>
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


// This also gets called at build time
export async function getServerSideProps(context) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  console.log("ff")
  console.log(context.query.id)
  // const res =  await apiExam.detail(6)
  // const data = await res.json()
  // console.log(res)
  // Pass post data to the page via props
  return { props: {} }
}

Edit.layout = Layout
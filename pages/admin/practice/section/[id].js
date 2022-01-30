import { useEffect, useState, useRef, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../../components/Cards/Card";
import Layout from "../../../../Layout/Layout";
import { set, useForm, useFieldArray } from "react-hook-form";
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
import { MyDTPicker } from "../../../../components/DateTime/DateTime";
import apiPractice from "../../../../action/practice";
import { useRouter } from "next/router";

export default function Create(props) {
  const Router = useRouter()
  const { id } = Router.query
  const FormikRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister, control } = useForm();
  const [status, setStatus] = useState()
  const [questionType, setQuestionType] = useState()
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "questions"
  });

  const [questions, setQuestions] = useState([
    {
      id: 0,
      type: Router.asPath.split('#')[1] === 'simple' ? 'simple' : 'paragraph',
      question_items: [{
        id: 0,
        question: '',
        answer_type: "single",
        options: [{
          id: 0,
          title: '',
          correct: 0
        }
        ]
      }]
    },
  ])

  const getDetail = async () => {
    await apiPractice.detailSection(id)
      .then((res) => {
        // setListSection(res.data.data)
        console.log(res.data.data)
      })

  }

  const submitQuiz = async (data) => {
    console.log(data)
    await apiPractice.createQuestion(data)
      .then((res) => {
        console.log(res.data.data)
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
    // getDetail()
  }, [questions]);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  const onRemoveData = (identifier) => {
    unregister(identifier)
    setValue(identifier, "")
  }

  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/admin/exams">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white overflow-visible"
        title="Add Question " >
        <form onSubmit={handleSubmit(submitQuiz)}>
          <input type="text" hidden defaultValue={id}  {...register('section_id')} />
          {questions.map((itemQuestion, indexQuestion) => {
            return (
              <div className="bg-blue-6 p-4 " key={indexQuestion}>
                <input type="text" hidden value={itemQuestion.type}  {...register(`questions.${indexQuestion}.type`)} />
                <div className="flex justify-between mt-2 bg-white p-4">
                  <div className="text-2xl font-bold">{indexQuestion + 1}. {itemQuestion.type === 'simple' ? 'Simple' : 'Paragraph'} Question</div>
                </div>
                {itemQuestion.type === 'paragraph' && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-full">
                        <p className="mt-4">Difficulty Level {errors && (
                          <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.level`]}</span>
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
                      <p className="mt-4">Instruction {errors && (
                        <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.instruction`]}</span>
                      )}</p>
                      <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >

                        {/* <textarea {...register(`questions[${indexQuestion}].question`)} /> */}
                        <Quill className="h-32   border-none rounded-lg" data={getValues(`questions[${indexQuestion}].instruction`)} register={(data) => setDataForm(`questions[${indexQuestion}].instruction`, data)} />
                      </div>
                      <div className="bg-white h-12">
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mt-4">Paragraph {errors && (
                        <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.paragraph`]}</span>
                      )}</p>
                      <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                        {/* <textarea {...register(`questions[${indexQuestion}].question`)} /> */}
                        <Quill className="h-32   border-none rounded-lg" data={getValues(`questions[${indexQuestion}].paragraph`)} register={(data) => setDataForm(`questions[${indexQuestion}].paragraph`, data)} />
                      </div>
                      <div className="bg-white h-12">
                      </div>
                    </div>
                  </>
                )}



                {/* question */}
                {itemQuestion.question_items.map((eachQuestion, indexEachQuestion) => {
                  return (
                    <div className="bg-white p-4 " key={indexEachQuestion}>
                      <div className="flex justify-between mt-2">
                        <div className="text-2xl font-bold"> </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-full">
                          <p className="mt-4">Difficulty Level {errors && (
                            <span className="text-red-1 text-sm">{errors.type}</span>
                          )}</p>
                          <Select bg='white' {...register(`questions[${indexQuestion}].question_items[${indexEachQuestion}].level`)} size="lg" variant='outline' iconColor="blue">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </Select>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Tag</p>
                          <Select bg='white' {...register(`questions[${indexQuestion}].question_items[${indexEachQuestion}].tag`)} size="lg" variant='outline' iconColor="blue">
                            <option value="tag 1">tag 1</option>
                            <option value="tag 2">tag 2</option>
                            <option value="tag 3">tag 3</option>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Question {errors && (
                          <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.question_items.${indexEachQuestion}.question`]}</span>
                        )}</p>
                        <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                          <Quill className="h-32   border-none rounded-lg" data={getValues(`questions[${indexQuestion}].question_items[${indexEachQuestion}].question`)} register={(data) => setDataForm(`questions[${indexQuestion}].question_items[${indexEachQuestion}].question`, data)} />
                        </div>
                        <div className="bg-white h-12">
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Answer Type {errors && (
                          <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.options`]}</span>
                        )}</p>
                        <Select bg='white' onClick={(e) => {

                          const temp = questions
                          temp.map((itemQ) => {
                            if (itemQ.id === itemQuestion.id) {
                              itemQ.question_items.map((b) => {
                                if (b.id === eachQuestion.id) {
                                  b.answer_type = e.target.value
                                  const n = b.options.length
                                  for (let i = 0; i < n; i++) {
                                    b.options[i].correct = 0
                                  }
                                }
                              })
                            } else {
                              itemQ
                            }
                          })
                          setQuestions([...temp])
                        }} {...register(`questions[${indexQuestion}].question_items[${indexEachQuestion}].answer_type`)} size="lg" variant='outline' iconColor="blue">
                          <option value="single">Single Correct Answer</option>
                          <option value="multiple">Multiple Correct Answer</option>
                        </Select>

                        <Option indexQuestion={indexQuestion} indexEachQuestion={indexEachQuestion} />
                        <div onClick={() => {
                          const newOption = {
                            id: eachQuestion.options[eachQuestion.options.length - 1].id + 1,
                            title: '',
                            correct: ''
                          }
                          const temp = questions
                          temp.map((itemQ) => {
                            if (itemQ.id === itemQuestion.id) {
                              itemQ.question_items.map((b) => {
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
                            <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.question_items.${indexEachQuestion}.answer_explanation`]}</span>
                          )}</p>
                          <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                            <Quill className="h-32   border-none rounded-lg" data={getValues(`questions[${indexQuestion}].question_items[${indexEachQuestion}].answer_explanation`)} register={(data) => setDataForm(`questions[${indexQuestion}].question_items[${indexEachQuestion}].answer_explanation`, data)} />
                          </div>
                          <div className="bg-white h-12">
                          </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                          <div className="w-full">
                            <p className="mt-4">Marks {errors && (
                              <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.question_items.${indexEachQuestion}.mark`]}</span>
                            )}</p>
                            <input type="number" className=" w-full form border p-4 rounded-lg" placeholder="0" {...register(`questions[${indexQuestion}].question_items[${indexEachQuestion}].mark`)} />
                          </div>
                          <div className="w-full">
                            <p className="mt-4">Negative Marking {errors && (
                              <span className="text-red-1 text-sm">{errors[`questions.${indexQuestion}.question_items.${indexEachQuestion}.negative_mark`]}</span>
                            )}</p>
                            <input type="number" className="w-full form border p-4 rounded-lg" placeholder="0" {...register(`questions[${indexQuestion}].question_items[${indexEachQuestion}].negative_mark`)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {/* add new question with same type  */}
                {itemQuestion.type === 'paragraph' && (
                  <div className="mt-8">
                    <div onClick={() => {
                      const newQuestionItem = {
                        id: itemQuestion.question_items[itemQuestion.question_items.length - 1].id + 1,
                        question: '',
                        answer_type: 'single',
                        options: [{
                          id: 0,
                          title: '',
                          correct: ''
                        }]
                      }
                      const temp = questions
                      temp.map((a) => {
                        if (a.id === itemQuestion.id) {
                          a.question_items = [...a.question_items, newQuestionItem]
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
          {/* add new question with different type */}
          <div className="mt-8">
            <div onClick={() => {
              onOpen()
            }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Question</div>
          </div>
          <div className="flex -z-10 gap-4 flex-row-reverse my-4">
            <button onClick={() => setStatus("published")} className='cursor-pointer bg-blue-1  text-white p-4 rounded-lg'>Save Question</button>
            <button onClick={() => setStatus("draft")} className='cursor-pointer text-blue-1 p-4 rounded-lg'>Cancel</button>
          </div>
        </form>
      </Card>


      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question </ModalHeader>
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
              <div className="bg-blue-1 p-3 rounded-lg text-white cursor-pointer" onClick={() => {
                // append(
                //   {
                //     // id: questions.length,
                //     type: questionType,
                //     question_items: [{
                //       question: '',
                //       answer_type: 'single',
                //       options: [{
                //         id: 0,
                //         title: '',
                //         correct: 0
                //       }]
                //     }]
                //   }
                // )
                setQuestions([...questions, {
                  id: questions.length,
                  type: questionType,
                  question_items: [{
                    question: '',
                    answer_type: 'single',
                    options: [{
                      id: 0,
                      title: '',
                      correct: 0
                    }]
                  }]
                },])
                onClose()
              }}>Select</div>
              <button type="button" className="text-black-4 p-3 rounded-lg" onClick={onClose}>Cancel</button>
            </div>
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
              Question has Published
              <div className="self-center">
                <Link href="/admin/exams">
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
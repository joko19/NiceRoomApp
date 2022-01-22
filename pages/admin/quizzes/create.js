import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../components/Cards/Card";
import Layout from "../../../Layout/Layout";
import apiNews from "../../../action/news";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider
} from '@chakra-ui/react'
import Quill from "../../../components/Editor/Quill";
import { Select } from '@chakra-ui/react'

export default function Create(props) {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [coverName, setCoverName] = useState(null)
  const [isPublish, setIsPublish] = useState()
  // const [tag, setTag] = useState()
  const [listTags, setListTags] = useState([{ name: 'Programming' }, { name: 'Design' }, { name: 'Marketing' }, , { name: 'UI/UX' }, { name: 'Education' }, { name: 'Web' }, { name: 'Android' }, , { name: 'Linux' }])
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState()
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Quiz Details', 'Instruction', 'Question']
  const [currentStep, setCurrentStep] = useState(1)

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [type, setType] = useState()
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [dateTime, setDateTime] = useState(new Date());
  const [instruction, setInstruction] = useState()
  const [consenment, setConsentment] = useState([0])
  const [questions, setQuestions] = useState([
    {
      id: 0,
      option: [1]
    },
  ])

  const chooseImage = (e) => {
    setCoverName(e.target.files[0].name)
    // setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const onQuill = (data) => {
    console.log(data)
  }


  const submitNews = async (req, status) => {
    console.log(req)
    const data = new FormData()
    data.append("topic_id", 1)
    data.append("name", req.name)
    data.append("type", req.type)
    data.append("status", "draft")
    data.append("duration", 90)
    if (file !== null) {
      data.append("file", file)
    }
    // data.append() //start time
    // end time
    data.append("instruction", instruction)
    for (let i = 0; i < req.consenments.length; i++) {
      data.append('consenments[]', req.consenments[i])
    }
    data.append("sub_title", req.subtitle)
    data.append("description", "hello world")
    // const tag = Array.from(tags)
    // tag.forEach((item) => {
    //   data.append("tags"+, item)
    // })
    for (let i = 0; i < tags.length; i++) {
      const tag = 'tags[' + i + ']'
      data.append(tag, tags[i].name)
    }
    if (file !== null) {
      data.append("image", file)
    }
    data.append("description", description)
    // for console log
    // for (var key of data.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    data.append("status", isPublish)
    await apiNews.create(data)
      .then((res) => {
        onOpenSuccessModal()
      })
      .catch((err) => setErrors(err.response.data.data))
  }

  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()

  const onSelectTags = (list, item) => {
    setTags(list)
  }

  const onRemoveTags = (list, item) => {
    setTags(list)
  }


  useEffect(() => {
    setEditorLoaded(true);
  }, []);


  const onEditorChange = (value) => {
    setInstruction(value)
    console.log(value)
  }

  const onFilesChange = (files) => {
    // setFiles(files)
  }
  const inputHandler = (event, editor) => {
    console.log(editor.getData())
    setValue("questions[0].question", editor.getData());
  };

  const onInstruction = (e) => {
    console.log(e.target.value)
  }
  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/admin/news">
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
        <form onSubmit={handleSubmit(submitNews)}>

          {currentStep === 1 && (
            <div>
              {type === 'Live Quiz' && (
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
                    <input type="text" className="form border w-full rounded-lg p-4 h-full " placeholder="Input Quiz Name"  {...register("title")} />
                  </div>
                </div>
                {type === 'Live Quiz' && (
                  <div className="w-full">
                    <p className="mt-4">Topic {errors && (
                      <span className="text-red-1 text-sm">{errors.topic}</span>
                    )}</p>
                    <div>
                      <select className="form w-full border bg-white p-4 h-full rounded-lg" placeholder="Choose Type" {...register("type")} >
                        <option value="Mixed Quiz">Topic 1</option>
                        <option value="Live Quiz">Topic 2</option>
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
                      console.log(e.target.value)
                      setType(e.target.value)
                    }} {...register("type")} >
                      <option value="Mixed Quiz">Mixed Quiz</option>
                      <option value="Live Quiz">Live Quiz</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <p className="mt-4">Duration (Can be 0) {errors && (
                    <span className="text-red-1 text-sm">{errors.sub_title}</span>
                  )}</p>
                  <div >
                    <div className="flex h-full">
                      <input type="number" className="border w-full h-full flex-grow rounded p-4" placeholder="0"  {...register("title")} />
                      <input className="bg-black-9 p-4 w-24 text-center h-full border text-black-4" placeholder="Minute" disabled />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}


          {currentStep === 2 && (
            <>
              <p className="mt-4">Description</p>
              <div className="w-full h-64">
                <Quill className="h-48" setData={(data) => setInstruction(data)} />
              </div>
              <p className="mt-4">Consentment</p>
              {consenment.map((item, index) => (
                <div key={index} className="flex">
                  <input key={index} type="text" className="form border w-full rounded-lg p-4 h-full m-1" placeholder="Input Consentment"  {...register(`consenments[${index}]`)} />
                  <div className="m-auto cursor-pointer text-blue-1 -ml-8" onClick={() => {
                    setConsentment(prevIndex => [...prevIndex.filter(i => i !== item)])
                    unregister(`consenments[${index}]`)
                  }} >x</div>
                </div>
              ))}
              <button>test</button>
              <div onClick={() => setConsentment([...consenment, consenment[consenment.length - 1] + 1])} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Consent</div>
            </>
          )}

          {currentStep === 3 && (
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
                            <option value="Hard">Hard</option>
                          </Select>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Tag {errors && (
                            <span className="text-red-1 text-sm">{errors.type}</span>
                          )}</p>
                          <Select bg='white' {...register(`questions[${indexQuestion}].tag`)} size="lg" variant='outline' iconColor="blue">
                            <option value="easy">tag 1</option>
                            <option value="medium">tag 2</option>
                            <option value="Hard">tag 3</option>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Question {errors && (
                          <span className="text-red-1 text-sm">{errors.type}</span>
                        )}</p>
                        <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                          <Quill className="h-32   border-none rounded-lg" setData={(data) => setInstruction(data)} {...register(`questions[${indexQuestion}].question`)}/>
                        </div>
                        <div className="bg-white h-20">
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Answer Type {errors && (
                          <span className="text-red-1 text-sm">{errors.type}</span>
                        )}</p>
                        <Select bg='white' {...register('answer_type')} size="lg" variant='outline' iconColor="blue">
                          <option value="single">Single Correct Answer</option>
                          <option value="multiple">Multiple Correct Answer</option>
                        </Select>

                        {questions[indexQuestion].option.map((itemAnswer, indexAnswer) => (
                          <div key={indexAnswer} className="flex">
                            <input key={indexAnswer} type="text" className="form border w-full rounded-lg p-4 h-full m-1" placeholder="Input your answer"  {...register(`consenments[${indexAnswer}]`)} />
                            <div className="m-auto cursor-pointer text-blue-1 -ml-8" onClick={() => {
                              const newOption = {
                                id: itemQuestion.id,
                                option: [...questions[itemQuestion.id].option.filter(i => i !== itemAnswer)]
                              }
                              const nQuestions = questions.map((obj) => (obj.id === itemQuestion.id ? newOption : obj))
                              setQuestions(nQuestions)
                              // setQuestions(prevIndex => [...prevIndex.filter(i => i !== item)])
                              unregister(`consenments[${indexAnswer}]`)
                            }} >
                              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon edit" />
                            </div>
                          </div>
                        ))}
                        <div onClick={() => {
                          const newOption = {
                            id: itemQuestion.id,
                            option: [...questions[itemQuestion.id].option, questions[itemQuestion.id].option.push(questions[itemQuestion.id].option[questions[itemQuestion.id].option.length - 1] + 1)]
                          }
                          const nQuestions = questions.map((obj) => (obj.id === itemQuestion.id ? newOption : obj))
                          setQuestions(nQuestions)
                        }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Answer</div>


                        <div className="mt-4">
                          <p className="mt-4">Answer Explanation {errors && (
                            <span className="text-red-1 text-sm">{errors.type}</span>
                          )}</p>
                          <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >
                            <Quill className="h-32   border-none rounded-lg" setData={(data) => setInstruction(data)} />
                          </div>
                          <div className="bg-white h-20">
                          </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                          <div className="w-full">
                            <p className="mt-4">Marks {errors && (
                              <span className="text-red-1 text-sm">{errors.establishment_year}</span>
                            )}</p>
                            <input type="number" className=" w-full form border p-4 rounded-lg" placeholder="0" {...register("establishment_year")} />
                          </div>
                          <div className="w-full">
                            <p className="mt-4">Negative Marking{errors && (
                              <span className="text-red-1 text-sm">{errors.pin_code}</span>
                            )}</p>
                            <input type="number" className="w-full form border p-4 rounded-lg" placeholder="0" {...register("pin_code")} />
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
                )}

              </div>
              <div onClick={() => setQuestions([...questions, { id: questions[questions.length - 1].id + 1, option: [0] }])} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Question</div>
            </div>
          )}

          <div className="flex -z-10 gap-4 flex-row-reverse my-4">
            <div onClick={() => {
              // renderEditor()
              currentStep < 3 && setCurrentStep(currentStep + 1)
            }} className={`${3 > currentStep ? 'cursor-pointer' : 'cursor-default'} bg-blue-1  text-white p-4 rounded-lg`}>Next Step</div>
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
              <p> News Created Successfully </p>
              <div className="self-center">
                <Link href="/admin/news">
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
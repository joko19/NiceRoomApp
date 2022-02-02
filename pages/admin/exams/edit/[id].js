import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../../components/Cards/Card";
import Layout from "../../../../Layout/Layout";
import { useForm } from "react-hook-form";
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
import apiExam from "../../../../action/exam";
import apiTopic from "../../../../action/topics";
import Multiselect from 'multiselect-react-dropdown';
import apiBatch from "../../../../action/batch";
import apiBranch from "../../../../action/branch";
import DatePicker2 from "../../../../components/DateTime/Date";
import { useRouter } from "next/router";
// import { Date } from "../../../components/DateTime/Date";
import { Time } from "../../../../components/DateTime/Time";
export default function Create(props) {
  const Router = useRouter()
  const { id } = Router.query
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Exams Details', 'Instruction', 'Sections']
  const [currentStep, setCurrentStep] = useState(1)
  const [topics, setTopics] = useState([])
  const [type, setType] = useState()
  const [instruction, setInstruction] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [consentments, setConsentments] = useState([0])
  const [status, setStatus] = useState()
  const [listBranch, setListBranch] = useState([])
  const [listBatch, setListBatch] = useState([])
  const [listTopic, setListTopic] = useState([])
  const [topicItem, setTopicItem] = useState([])
  const [batchItem, setBatchItem] = useState([])
  const [branchItem, setBranchItem] = useState([])
  const [examType, setExamType] = useState([])
  const [sections, setsections] = useState([
    {
      id: 0,
    },
  ])


  const getDetail = async (id) => {
    await apiExam.detail(id)
      .then((res) => {
        console.log(res.data.data)
        const data = res.data.data
        setType(res.data.data.type)
        setValue("name", data.name)
        setValue("type", data.type)
        setValue("exam_type_id", data.exam_type_id)
        setType(data.type)
        onSelectBatch(res.data.data.batches, '')
        onSelectBranch(res.data.data.batches, '')
        onSelectTopic(res.data.data.batches, '')
        if (data.type === 'live') {
          setValue("topic_id", data.topic_id)
          setValue("start_time", data.start_time)
          setValue("end_time", data.end_time)
          setStartTime(data.start_time)
          setEndTime(data.end_time)
        }
        setValue("instruction", data.instruction)

        if (data.consentments !== 'null') {
          const str = data.consentments.replace(/['"]+/g, '').slice(1)
          const myArr = str.slice(0, str.length - 1).split(", ")
          var arr = []
          for (let i = 0; i < myArr.length; i++) {
            arr.push(myArr[i])
          }
          console.log(arr)
          setConsentments(arr)
          for (let i = 0; i < arr.length; i++) {
            // setValue(`consentments[${i}]`, arr[i])
            console.log(arr[i])
          }
        }
        setsections([...data.sections])
        for (let i = 0; i < data.sections.length; i++) {
          const field = `sections[${i}]`
          setValue(`${field}[id]`, data.sections[i].id)
          setValue(`${field}[name]`, data.sections[i].name)
          setValue(`${field}[duration]`, data.sections[i].duration)
          setValue(`${field}[instruction]`, data.sections[i].instruction)
        }
      })
  }

  const getBranch = async () => {
    await apiBranch.all()
      .then((res) => {
        // console.log(res)
        setListBranch(res.data.data)
      })
  }

  const getBatch = async () => {
    await apiBatch.all()
      .then((res) => {
        setListBatch(res.data.data)
      })
  }

  const getExamType = async () => {
    await apiExam.allType()
      .then((res) => {
        setExamType(res.data.data)
      })
  }

  const onSelectBranch = (list, item) => {
    setBranchItem(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("branches[]", arr)
  }
  const onRemoveBranch = (list, item) => {
    setBranchItem(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("branches[]", arr)
  }

  const onSelectBatch = (list, item) => {
    setBatchItem(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("batches[]", arr)
  }

  const onRemoveBatch = (list, item) => {
    setBatchItem(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("batches[]", arr)
  }
  const onSelectTopic = (list, item) => {
    setTopicItem(list)
    console.log(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("topics[]", arr)
  }

  const onRemoveTopic = (list, item) => {
    setTopicItem(list)
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].id)
    }
    setValue("topics[]", arr)
  }

  const getTopics = async () => {
    await apiTopic.all('', '', '')
      .then((res) => setListTopic(res.data.data.data))
  }

  const submitExams = async (data) => {
    if (currentStep === 1) {
      await apiExam.update(id, data)
        .then(() =>
          setCurrentStep(2))
        .catch((err) => {
          setErrors(err.response.data.data)
          console.log(err.response)
          if (!err.response.data.data.name && !err.response.data.data.duration && !err.response.data.data.start_date && !err.response.data.data.end_date && !err.response.data.data.start_time && !err.response.data.data.end_time) {
            setErrors(null)
            setCurrentStep(2)
          }
          return;
        })
      return null
    }

    if (currentStep === 2) {
      console.log(data)
      delete data.consentments
      const arr = []
      if (consentments) {
        for (let i = 0; i < consentments.length; i++) {
          arr.push(consentments[i])
          const field = `consentments[${i}]`
          setValue(`${field}`, consentments[i])
        }
      }
      data.consentments = arr
      console.log(data)
      await apiExam.update(id, data)
        .then(() =>
          setCurrentStep(3))
        .catch((err) => {
          setErrors(err.response.data.data)
          console.log(err.response.data.data)
          if (!err.response.data.data["consentments"] && !err.response.data.data.instruction) {
            setErrors(null)
            setCurrentStep(3)
            getDetail(id)
          }
          return;
        })
      return null
    }

    if (currentStep === 3) {
      console.log(data)
      await apiExam.update(id, data)
        .then((res) => {
          onOpenSuccessModal()
        })
        .catch((err) => {
          console.log(err.response.data.data)
          setErrors(err.response.data.data)
        })
    }
  }

  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()

  useEffect(() => {
    getDetail(id)
    getTopics()
    getBatch()
    getBranch()
    getExamType()
  }, [currentStep]);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  return (
    <div className="md:pt-12 md:pb-28">
      <Link href="/admin/exams">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white overflow-visible"
        title="Edit Exam " >
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
        <form onSubmit={handleSubmit(submitExams)}>

          {currentStep === 1 && (
            <div className="mb-8">
              <div className="flex gap-4 ">
                <div className="w-full gap-4">
                  <p className="mt-4">Held Type</p>
                  <div className="flex gap-4">
                    <div className={` ${type === 'live' ? 'bg-blue-6' : 'bg-white'} flex gap-2 w-full p-4 border rounded-lg cursor-pointer`} onClick={() => setType('live')}>
                      <div  >
                        <Image src={`${type === 'live' ? "/asset/icon/table/ic_radio_active.png" : "/asset/icon/table/ic_radio.png"}`} height={16} width={16} className="flex align-middle my-auto" />
                      </div>
                      <p className={`${type === 'live' ? 'text-blue-1' : 'text-black-5'}`}>
                        Live Exam
                      </p>
                    </div>
                    <div className={` ${type === 'standard' ? 'bg-blue-6' : 'bg-white'} flex gap-2 w-full p-4 border rounded-lg cursor-pointer`} onClick={() => setType('standard')}>
                      <div >
                        <Image src={`${type === 'standard' ? "/asset/icon/table/ic_radio_active.png" : "/asset/icon/table/ic_radio.png"}`} height={16} width={16} className="flex align-middle my-auto" />
                      </div>
                      <p className={`${type === 'standard' ? 'text-blue-1' : 'text-black-5'}`}>
                        Standard Exam
                      </p>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="mt-4">Exam Name {errors && (
                    <span className="text-red-1 text-sm">{errors.name}</span>
                  )}</p>
                  <div>
                    <input type="text" className="form border w-full rounded-lg p-4 h-full" placeholder="Input Exam Name"  {...register("name")} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 " >
                <div className="w-full">
                  <p className="mt-4">Exam Type {errors && (
                    <span className="text-red-1 text-sm">{errors.type}</span>
                  )}</p>
                  <div>
                    <Select bg='white' size="lg" defaultValue="1" variant='outline' iconColor="blue" {...register('exam_type_id')}>
                      <option disabled>Choose Exam Type</option>
                      {examType.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </Select>
                  </div>
                </div><div className="w-full ">
                  <p className="mt-4">Topic {errors && (
                    <span className="text-red-1 text-sm">{errors.topics}</span>
                  )}</p>
                  <Multiselect
                    className="z-100 "
                    options={listTopic}
                    style={{
                      "multiselectContainer": {
                        "padding": "4px",
                        "border-width": "1px",
                        "border-radius": "5px"
                      }, "searchBox": {
                        "border": "none",
                      },
                    }}
                    placeholder="Select Topic"
                    // singleSelect
                    // options={listTag} // Options to display in the dropdown
                    selectedValues={topicItem} // Preselected value to persist in dropdown
                    onSelect={onSelectTopic} // Function will trigger on select event
                    onRemove={onRemoveTopic} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
              </div>


              {type === 'live' && (
                <>
                  <div className="flex mt-4 gap-4">
                    <div className="w-full">
                      <p>Start Date {errors && (
                        <span className="text-red-1 text-sm">{errors.start_date}</span>
                      )}</p>
                      <div className="border p-4 rounded-lg">
                        <DatePicker2
                          setData={(data) => setValue("start_date", data)}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p>Start Time {errors && (
                        <span className="text-red-1 text-sm">{errors.start_time}</span>
                      )}</p>
                      <Time data={getValues("end_time")} setDate={(data) => setValue("start_time", data)} />
                    </div>
                  </div>
                  <div className="flex mt-4 gap-4">
                    <div className="w-full">
                      <p>End Date {errors && (
                        <span className="text-red-1 text-sm">{errors.end_date}</span>
                      )}</p>
                      <div className="border p-4 rounded-lg">
                        <DatePicker2
                          setData={(data) => setValue("end_date", data)}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p>End Time {errors && (
                        <span className="text-red-1 text-sm">{errors.end_time}</span>
                      )}</p>
                      <Time data={getValues("end_time")} setDate={(data) => setValue("end_time", data)} />
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-4 flex-col md:flex-row" >
                <div className="w-full ">
                  <p>Batch {errors && (
                    <span className="text-red-1 text-sm">{errors.batches}</span>
                  )}</p>
                  <Multiselect
                    className="z-100 "
                    options={listBatch}
                    style={{
                      "multiselectContainer": {
                        "padding": "4px",
                        "border-width": "1px",
                        "border-radius": "5px"
                      }, "searchBox": {
                        "border": "none",

                      },
                    }}
                    placeholder="Select Batch"
                    // singleSelect
                    // options={listTag} // Options to display in the dropdown
                    selectedValues={batchItem} // Preselected value to persist in dropdown
                    onSelect={onSelectBatch} // Function will trigger on select event
                    onRemove={onRemoveBatch} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <div className="w-full ">
                  <p>Branch {errors && (
                    <span className="text-red-1 text-sm">{errors.branches}</span>
                  )}</p>
                  <div>
                    <Multiselect
                      className="z-100 "
                      options={listBranch}
                      style={{
                        "multiselectContainer": {
                          "padding": "4px",
                          "border-width": "1px",
                          "border-radius": "5px"
                        }, "searchBox": {
                          "border": "none",

                        },
                      }}
                      placeholder="Select Branch"
                      // singleSelect
                      // options={listTag} // Options to display in the dropdown
                      selectedValues={branchItem} // Preselected value to persist in dropdown
                      onSelect={onSelectBranch} // Function will trigger on select event
                      onRemove={onRemoveBranch} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />

                  </div>
                </div>
              </div>
            </div>
          )}


          {currentStep === 2 && (
            <>
              <p className="mt-4">Instruction {errors && (
                <span className="text-red-1 text-sm">{errors['instruction']}</span>
              )}</p>
              <div className="w-full h-64">
                <Quill className="h-48" data={getValues('instruction')} setData={(data) => setValue('instruction', data)} />
              </div>
              <p className="mt-4">Consentment</p>
              {consentments.map((item, index) => {
                return (
                  <>{errors && (
                    <span className="text-red-1 text-sm">{errors[`consentments.${index}`]}</span>
                  )}
                    <div key={index} className="flex">
                      <input key={index} type="text" value={item} onChange={(e) => {
                        const arr = consentments
                        arr[index] = e.target.value
                        setConsentments([...arr])
                        setValue(`consentments[${index}]`, e.target.value)
                      }} className="form border w-full rounded-lg p-4 h-full m-1" autoComplete="off" placeholder="Input Consentment" />
                      {consentments.length !== 1 && (
                        <div className="m-auto cursor-pointer text-blue-1 -ml-8" onClick={() => {
                          let newArr = consentments
                          newArr.splice(index, 1)
                          setConsentments([...newArr])
                        }} >x</div>
                      )}
                    </div>
                  </>
                )
              })}
              <div onClick={() => setConsentments([...consentments, ''])} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Consentment</div>
            </>
          )}

          {currentStep === 3 && (
            <div className="mt-8">
              <div className="bg-blue-6 p-4">
                {sections.map((itemQuestion, indexQuestion) => {
                  if (itemQuestion.new) {
                    setValue(`sections[${indexQuestion}].id`, -1)
                  }
                  return (
                    <>
                      <p className="font-bold mt-4 text-lg">Section {indexQuestion + 1}</p>
                      <div className="flex gap-4" >
                        <div className="w-full">
                          <p className="mt-4">Section Name{errors && (
                            <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.name`]}</span>
                          )}</p>
                          <div>
                            <input type="text" className="form border w-full rounded-lg p-4 h-full" placeholder="Input Section Name"  {...register(`sections[${indexQuestion}].name`)} />
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Duration {errors && (
                            <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.duration`]}</span>
                          )}</p>
                          <div >
                            <div className="flex h-full">
                              <input type="number" className="border w-full h-full flex-grow rounded p-4" placeholder="0"  {...register(`sections[${indexQuestion}].duration`)} />
                              <input className="bg-black-9 p-4 w-24 text-center h-full border text-black-4" placeholder="Minute" disabled />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="mt-4">Instruction {errors && (
                          <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.instruction`]}</span>
                        )}</p>
                        <div className="w-full  bg-white rounded-lg " style={{ lineHeight: 2 }} >

                          {/* <textarea {...register(`sections[${indexQuestion}].question`)} /> */}
                          <Quill className="h-32   border-none rounded-lg" data={getValues(`sections[${indexQuestion}].instruction`)} register={(data) => setDataForm(`sections[${indexQuestion}].instruction`, data)} />
                        </div>
                        <div className="bg-white h-12">
                        </div>
                      </div>

                    </>
                  )
                }
                )}

              </div>
              <div onClick={() => {
                setsections([...sections, {
                  id: sections[sections.length - 1].id + 1, option: [0],
                  new: true
                }])
              }} className="text-blue-1 cursor-pointer text-center p-4 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Section</div>
            </div>
          )}
          <div className="flex -z-10 gap-4 flex-row-reverse my-4">
            {currentStep < 3 && (
              <button className={`${3 > currentStep ? 'cursor-pointer' : 'cursor-default'} bg-blue-1  text-white p-4 rounded-lg`}>Next Step</button>
            )}
            {currentStep === 3 && (
              <>
                <button onClick={() => setStatus("published")} className='cursor-pointer bg-blue-1  text-white p-4 rounded-lg'>Save Test</button>
              </>
            )}
            <div onClick={() => {
              currentStep > 1 && setCurrentStep(currentStep - 1)
              console.log(currentStep)
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
              Section Successfully Created
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


// This also gets called at build time
export async function getServerSideProps(context) {
  return { props: {} }
}

Create.layout = Layout
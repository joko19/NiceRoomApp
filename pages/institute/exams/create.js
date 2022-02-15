import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "../../../components/Cards/Card";
import Layout from "../../../Layout/Layout";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import QuillCreated from "../../../components/Editor/QuillCreated";
import { Select } from '@chakra-ui/react'
import apiExam from "../../../action/exam";
import apiTopic from "../../../action/topics";
import Multiselect from 'multiselect-react-dropdown';
import apiBatch from "../../../action/batch";
import apiBranch from "../../../action/branch";
import DatePicker2 from "../../../components/DateTime/Date";
import { Time } from "../../../components/DateTime/Time";
import Button, { BackButton } from "../../../components/Button/button";
import { Stepper } from "../../../components/Section/Stepper";

export default function Create(props) {
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Exams Details', 'Instruction', 'Sections']
  const [currentStep, setCurrentStep] = useState(1)
  const [type, setType] = useState('standard')
  const [consentments, setConsentments] = useState([''])
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

  const getBranch = async () => {
    await apiBranch.all()
      .then((res) => {
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
    if (data.type === 'standard') {
      delete data.start_time
      delete data.end_time
      delete data.start_date
      delete data.end_date
    }
    if (currentStep === 1) {
      await apiExam.create(data)
        .then()
        .catch((err) => {
          setErrors(err.response.data.data)
          if (!err.response.data.data.name && !err.response.data.data.duration && !err.response.data.data.exam_type_id && !err.response.data.data.start_date && !err.response.data.data.end_date && !err.response.data.data.start_time && !err.response.data.data.end_time) {
            setErrors(null)
            setCurrentStep(2)
          }
          return;
        })
      return null
    }

    data.consentments = consentments
    if (currentStep === 2) {
      await apiExam.create(data)
        .then()
        .catch((err) => {
          setErrors(err.response.data.data)
          if (!err.response.data.data["consentments"] && !err.response.data.data.instruction) {
            setErrors(null)
            setCurrentStep(3)
          }
          return;
        })
      return null
    }

    if (currentStep === 3) {
      await apiExam.create(data)
        .then((res) => {
          onOpenSuccessModal()
        })
        .catch((err) => {
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
    getTopics()
    getBatch()
    getBranch()
    getExamType()
  }, []);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  return (
    <div>
      <BackButton url="institute/exams" />
      <Card
        className=" w-full  bg-white overflow-visible"
        title="Create New Exam " >
        <Stepper step={step} currentStep={currentStep} />
        <form onSubmit={handleSubmit(submitExams)} className="text-sm">
          {currentStep === 1 && (
            <div className="mb-8">
              <input hidden type="text" value={type} {...register("type")} />
              <div className="flex gap-4 ">
                <div className="w-full gap-4">
                  <p className="mt-4">Held Type</p>
                  <div className="flex gap-4">
                    <div className={` ${type === 'live' ? 'bg-blue-6' : 'bg-white'} flex gap-2 h-8 w-full border rounded cursor-pointer`} onClick={() => {
                      setValue("type", "live")
                      setType('live')
                    }}>
                    <div className="my-auto ml-2">
                        <Image src={`${type === 'live' ? "/asset/icon/table/ic_radio_active.svg" : "/asset/icon/table/ic_radio.svg"}`} height={12} width={12} className="flex align-middle my-auto" />
                      </div>
                      <p className={`${type === 'live' ? 'text-blue-1' : 'text-black-5'} my-auto`}>
                        Live Exam
                      </p>
                    </div>
                    <div className={` ${type === 'standard' ? 'bg-blue-6' : 'bg-white'} flex gap-2  w-full  h-8 border rounded cursor-pointer`} onClick={() => {
                      setValue("type", "standard")
                      setType('standard')
                    }}>
                      <div className="my-auto ml-2">
                        <Image src={`${type === 'standard' ? "/asset/icon/table/ic_radio_active.svg" : "/asset/icon/table/ic_radio.svg"}`} height={12} width={12} className="flex align-middle my-auto ml-4" />
                      </div>
                      <p className={`${type === 'standard' ? 'text-blue-1' : 'text-black-5'} my-auto `}>
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
                    <input type="text" className="form border w-full rounded p-2 h-full" placeholder="Input Exam Name"  {...register("name")} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 " >

                <div className="w-full">
                  <p className="mt-4">Exam Type {errors && (
                    <span className="text-red-1 text-sm">{errors.exam_type_id}</span>
                  )}</p>
                  <div>
                    <Select height={8} size="sm" bg='white' defaultValue="1" variant='outline' style={{
                      'size': '28px'
                    }} iconColor="blue" {...register('exam_type_id')}>
                      <option value="" >Choose Exam type</option>
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
                        "padding": "0px",
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
                      <div className="border p-2 rounded">
                        <DatePicker2
                          setData={(data) => setValue("start_date", data)}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <p>Start Time {errors && (
                        <span className="text-red-1 text-sm">{errors.start_time}</span>
                      )}</p>
                      <Time data={getValues("start_time")} setDate={(data) => setValue("start_time", data)} />
                    </div>
                  </div>
                  <div className="flex mt-4 gap-4">
                    <div className="w-full">
                      <p>End Date {errors && (
                        <span className="text-red-1 text-sm">{errors.end_date}</span>
                      )}</p>
                      <div className="border p-2 rounded">
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
                        "padding": "0px",
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
                          "padding": "0px",
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
                <QuillCreated className="h-48" data={getValues('instruction')} setData={(data) => setValue('instruction', data)} />
              </div>

              <p className="mt-4">Consentment</p>
              {consentments.map((item, index) => (
                <>{errors && (
                  <span className="text-red-1 text-sm">{errors[`consentments.${index}`]}</span>
                )}
                  <div key={index} className="flex">
                    <input key={index} type="text" value={item} onChange={(e) => {
                      const arr = consentments
                      arr[index] = e.target.value
                      setConsentments([...arr])
                      setValue(`consentments[${index}]`, e.target.value)
                    }} className="form border w-full p-2 rounded h-full m-1" autoComplete="off" placeholder="Input Consentment" />
                    {consentments.length !== 1 && (
                      <div className="m-auto cursor-pointer text-blue-1 -ml-8" onClick={() => {
                        let newArr = consentments
                        newArr.splice(index, 1)
                        setConsentments([...newArr])
                      }} >x</div>
                    )}
                  </div>
                </>
              ))}
              <div onClick={() => setConsentments([...consentments, ''])} className="text-blue-1 cursor-pointer text-center p-2 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Consentment</div>
            </>
          )}

          {currentStep === 3 && (
            <div className="mt-8">
              <div className="bg-blue-6 p-4">
                {sections.map((itemQuestion, indexQuestion) => {
                  return (
                    <>
                      <p className="font-bold mt-4 text-lg">Section {indexQuestion + 1}</p>
                      <div className="flex gap-4" >
                        <div className="w-full">
                          <p className="mt-4">Section Name{errors && (
                            <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.name`]}</span>
                          )}</p>
                          <div>
                            <input type="text" className="form border w-full p-2 rounded h-full" placeholder="Input Section Name"  {...register(`sections[${indexQuestion}].name`)} />
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Duration {errors && (
                            <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.duration`]}</span>
                          )}</p>
                          <div >
                            <div className="flex h-full">
                              <input type="number" className="border w-full h-full flex-grow rounded p-2" placeholder="0"  {...register(`sections[${indexQuestion}].duration`)} />
                              <input className="bg-black-9 p-2 w-24 text-center h-full border text-black-4" placeholder="Minute" disabled />
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
                          <QuillCreated className="h-32   border-none rounded-lg" data='' register={(data) => setDataForm(`sections[${indexQuestion}].instruction`, data)} />
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
                setsections([...sections, { id: sections[sections.length - 1].id + 1, option: [0] }])
              }} className="text-blue-1 cursor-pointer text-center p-2 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Section</div>
            </div>
          )}
          <div className="flex -z-10 gap-4 flex-row-reverse my-4">
            {currentStep < 3 && (<div className={`${3 > currentStep ? 'cursor-pointer' : 'cursor-default'}`}><Button title="Next Step" /></div>
            )}
            {currentStep === 3 && (
              <>
                <div onClick={() => setStatus("published")}><Button title="Save Test" /></div>
              </>
            )}
            <div onClick={() => {
              currentStep > 1 && setCurrentStep(currentStep - 1)
            }} className={`${1 < currentStep ? 'cursor-pointer' : 'cursor-default'}  text-black-4 p-2 rounded`}>Back Step</div>
          </div>
        </form>
      </Card>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="medium"><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center text-sm ">
              Section Successfully Created
              <div className="self-center">
                <Link href="/institute/exams">
                  <a><Button title="Okay" className="mt-4" /></a>
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
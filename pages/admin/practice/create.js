import { useEffect, useState } from "react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
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
  Divider,
} from '@chakra-ui/react'
import QuillCreated from "../../../components/Editor/QuillCreated";
import { Select } from '@chakra-ui/react'
import apiPractice from "../../../action/practice";
import apiTopic from "../../../action/topics";
import Multiselect from 'multiselect-react-dropdown';
import DatePicker2 from "../../../components/DateTime/Date";
import Button, { BackButton } from "../../../components/Button/button";
import apiExam from "../../../action/exam";
import { Time } from "../../../components/DateTime/Time";
import { Stepper } from "../../../components/Section/Stepper";
export default function Create(props) {
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Practice Details', 'Instruction', 'Sections']
  const [currentStep, setCurrentStep] = useState(1)
  const [topics, setTopics] = useState([])
  const [instruction, setInstruction] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [consentments, setConsentments] = useState([''])
  const [status, setStatus] = useState()
  const [listTopic, setListTopic] = useState([])
  const [topicItem, setTopicItem] = useState([])
  const [type, setType] = useState([])
  const [sections, setsections] = useState([
    {
      id: 0,
    },
  ])
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

  useEffect(async () => {
    await apiExam.allType()
      .then((res) => setType(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  const getTopics = async () => {
    await apiTopic.all('', '', '')
      .then((res) => setListTopic(res.data.data.data))
  }

  const submitPractice = async (data) => {
    if (currentStep === 1) {
      await apiPractice.create(data)
        .then(() =>
          setCurrentStep(2))
        .catch((err) => {
          setErrors(err.response.data.data)
          if (!err.response.data.data.name && !err.response.data.data.duration && !err.response.data.data.exam_type_id) {
            setErrors(null)
            setCurrentStep(2)
          }
          return;
        })
      return null
    }

    data.consentments = consentments
    if (currentStep === 2) {
      await apiPractice.create(data)
        .then(() =>
          setCurrentStep(3))
        .catch((err) => {
          setErrors(err.response.data.data)

          if (!err.response.data.data["consentments"] && !err.response.data.data.instruction && !err.response.data.data.start_time) {
            setErrors(null)
            setCurrentStep(3)
          }
          return;
        })
      return null
    }

    if (currentStep === 3) {
      await apiPractice.create(data)
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
  }, []);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  return (
    <div className="md:mt-12 md:pb-28">
      <BackButton url="/admin/practice" />
      <Card
        className="w-full  bg-white overflow-visible text-sm"
        title="Create New Practice " >
        <Stepper step={step} currentStep={currentStep} />
        <form onSubmit={handleSubmit(submitPractice)}>

          {currentStep === 1 && (
            <div className="mb-8">
              <div className="flex gap-4 ">
                <div className="w-full">
                  <p className="mt-4">Practice Name {errors && (
                    <span className="text-red-1 text-sm">{errors.name}</span>
                  )}</p>
                  <div>
                    <input type="text" className="form border w-full rounded p-2 h-full text-sm" placeholder="Input Practice Name"  {...register("name")} />
                  </div>
                </div>
                <div className="w-full ">
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

              <div className="flex gap-4 " >
              </div>


              <div className="flex mt-4 gap-4">
                <div className="w-full">
                  <p>Start Date</p>
                  <div className="border rounded p-1">
                    <DatePicker2
                      setData={(data) => setValue("start_date", data)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p>Start Time</p>
                  <Time data={getValues("start_time")} setDate={(data) => setValue("start_time", data)} />
                </div>
              </div>


              <div className="flex gap-4" >
                <div className="w-full">
                  <p className="mt-4">Practice Type {errors && (
                    <span className="text-red-1 text-sm">{errors.exam_type_id}</span>
                  )}</p>
                  <div className="border  p-1 rounded text-sm">
                    <select className="w-full bg-white" {...register('exam_type_id')}>
                      <option value="" >Choose Type</option>
                      {type.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}</select>
                  </div>
                </div>
                <div className="w-full"></div>
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
                    }} className="form border w-full rounded p-2 h-full m-1" autoComplete="off" placeholder="Input Consentment" />
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
                      <p className="font-bold mt-4 text-sm">Section {indexQuestion + 1}</p>
                      <div className="flex gap-4" >
                        <div className="w-full">
                          <p className="mt-4">Section Name{errors && (
                            <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.name`]}</span>
                          )}</p>
                          <div>
                            <input type="text" className="form border w-full rounded p-2 text-sm h-full" placeholder="Input Section Name"  {...register(`sections[${indexQuestion}].name`)} />
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="mt-4">Duration {errors && (
                            <span className="text-red-1 text-sm">{errors[`sections.${indexQuestion}.duration`]}</span>
                          )}</p>
                          <div >
                            <div className="flex h-full">
                              <input type="number" className="border w-full h-full flex-grow text-sm rounded p-2" placeholder="0"  {...register(`sections[${indexQuestion}].duration`)} />
                              <input className="bg-black-9 p-2 w-24 text-center h-full border text-sm text-black-4" placeholder="Minute" disabled />
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
            }} className={`${1 < currentStep ? 'cursor-pointer' : 'cursor-default'}  text-black-4 rounded p-2`}>Back Step</div>
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
                <Link href="/admin/practice">
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
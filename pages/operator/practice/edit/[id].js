import { useEffect, useState } from "react";
import Link from "next/link";
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
  useToast
} from '@chakra-ui/react'
import Quill from "../../../../components/Editor/Quill";
import { Select } from '@chakra-ui/react'
import apiPractice from "../../../../action/practice";
import apiTopic from "../../../../action/topics";
import Multiselect from 'multiselect-react-dropdown';
import DatePicker2 from "../../../../components/DateTime/Date";
import { useRouter } from "next/router";
import Button, { BackButton } from "../../../../components/Button/button";
import apiExam from "../../../../action/exam";
import { Time } from "../../../../components/DateTime/Time";
import { Stepper } from "../../../../components/Section/Stepper";
export default function Create(props) {
  const Router = useRouter()
  const { id } = Router.query
  const [errors, setErrors] = useState()
  const toast = useToast()
  const { register, handleSubmit, setValue, getValues, reset, unregister } = useForm();
  const step = ['Practice Details', 'Instruction', 'Sections']
  const [currentStep, setCurrentStep] = useState(1)
  const [type, setType] = useState('standard')
  const [startTime, setStartTime] = useState()
  const [typePractice, setTypePractice] = useState([])
  const [consentments, setConsentments] = useState([''])
  const [status, setStatus] = useState()
  const [listTopic, setListTopic] = useState([])
  const [topicItem, setTopicItem] = useState([])
  const [sections, setsections] = useState([
    {
      id: 0,
    },
  ])


  useEffect(async () => {
    await apiExam.allType()
      .then((res) => setTypePractice(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const uri = Router.asPath.split('#')
    if (uri[1] === 'draft') {
      toast({
        title: 'Change Needed',
        description: "You must change date before edit Exams",
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [])

  const getDetails = async (id) => {
    await apiPractice.detail(id)
      .then((res) => {
        const data = res.data.data
        setType(res.data.data.type)
        setValue("name", data.name)
        setValue("type", data.type)
        setValue("exam_type_id", data.exam_type_id)
        onSelectTopic(data.topics, "")
        const start = data.start_time.split(":")
        setStartTime(start[0] + ":" + start[1])
        setValue("start_time", start[0] + ":" + start[1])
        setValue("start_date", data.start_date)
        setValue("instruction", data.instruction)

        if (data.consentments !== 'null') {
          const str = data.consentments.replace(/['"]+/g, '').slice(1)
          const myArr = str.slice(0, str.length - 1).split(", ")
          var arr = []
          for (let i = 0; i < myArr.length; i++) {
            arr.push(myArr[i])
          }
          setConsentments(arr)
          for (let i = 0; i < arr.length; i++) {
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

  const submitPractice = async (data) => {
    if (currentStep === 1) {
      const arr = []
      if (consentments) {
        for (let i = 0; i < consentments.length; i++) {
          arr.push(consentments[i])
          const field = `consentments[${i}]`
          setValue(`${field}`, consentments[i])
        }
      }
      data.consentments = arr
      await apiPractice.update(id, data)
        .then(() =>
          setCurrentStep(2))
        .catch((err) => {
          setErrors(err.response.data.data)
          if (!err.response.data.data.name && !err.response.data.data.duration) {
            setErrors(null)
            setCurrentStep(2)
          }
          return;
        })
      return null
    }

    if (currentStep === 2) {
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
      await apiPractice.update(id, data)
        .then(() =>
          setCurrentStep(3))
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
      const arr = []
      if (consentments) {
        for (let i = 0; i < consentments.length; i++) {
          arr.push(consentments[i])
          const field = `consentments[${i}]`
          setValue(`${field}`, consentments[i])
        }
      }
      data.consentments = arr
      await apiPractice.update(id, data)
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
    getDetails(id)
  }, []);

  const setDataForm = (identifier, data) => {
    setValue(identifier, data)
  }

  return (
    <div className="md:pt-12 md:pb-28">
      <BackButton url="/operator/practice" />
      <Card
        className="w-full  bg-white overflow-visible"
        title="Edit Practice " >
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
                    <input type="text" className="form border w-full rounded p-2 h-full" placeholder="Input Practice Name"  {...register("name")} />
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
                  <div className="border p-1 rounded">
                    <DatePicker2
                      data={getValues("start_date")}
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
                    <span className="text-red-1 text-sm">{errors.type}</span>
                  )}</p>
                  <div>
                    <Select bg='white' size="sm" height={8} variant='outline' iconColor="blue" {...register('exam_type_id')}>
                      {typePractice.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </Select>
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
                      }} className="form border w-full rounded-lg p-2 h-full m-1" autoComplete="off" placeholder="Input Consentment" />
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
              <div onClick={() => setConsentments([...consentments, ''])} className="text-blue-1 cursor-pointer text-center p-2 border-dashed border-2 border-blue-1 mt-4 rounded-lg">+ Add New Consent</div>
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
            {currentStep < 3 && (<div className={`${3 > currentStep ? 'cursor-pointer' : 'cursor-default'} `}><Button title="Next Step" /></div>
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
          <ModalHeader><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center ">
              Section Successfully Created
              <div className="self-center">
                <Link href="/operator/practice">
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


// This also gets called at build time
export async function getServerSideProps(context) {
  return { props: {} }
}
Create.layout = Layout
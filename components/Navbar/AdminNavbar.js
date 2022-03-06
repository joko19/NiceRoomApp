import React from "react";
import Link from 'next/link'
import Image from "next/image";
import UserDropdown from "../Dropdowns/UserDropdown.js";
import instance from "../../action/instance.js";
import apiAccount from "../../action/account.js";
import { useEffect, useState } from "react";
import { store } from './../../redux/store'
import role from "../../redux/role";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Button from "../Button/button.js";
import { useDispatch } from "react-redux";
import { reSetCurrentUser } from "../../action/auth/authAction";
import apiStudentPage from '../../action/student_page'

export default function AdminNavbar() {
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [username, setUsername] = useState()
  const roleStore = store.getState().auth.user.user.roles[0].name
  const [activeSidebar, setActiveSidebar] = useState(false)
  const router = useRouter();
  const list = [1, 2, 3, 4, 5, 6]
  const Router = useRouter()
  const dispatch = useDispatch()
  const [openProfile, setOpenProfile] = useState(false)
  const [listInstitute, setListInstitute] = useState([])
  const [instituteSelect, setInstituteSelect] = useState({})
  const { register, handleSubmit, setValue } = useForm();
  const {
    isOpen: isCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal
  } = useDisclosure()
  const [itemList, setItemList] = useState([])
  const uri = "/asset/icon/sidebar/"
  const admin = [{
    icon: uri + 'ic_home.svg',
    active: uri + 'ic_home_active.svg',
    name: 'Home',
    path: '/admin/dashboard'
  }, {
    icon: uri + 'ic_institute.svg',
    active: uri + 'ic_institute_active.svg',
    name: 'Institute',
    path: '/admin/institution'
  }, {
    icon: uri + 'ic_institute_admin.svg',
    active: uri + 'ic_institute_admin_active.svg',
    name: 'Institute Admin',
    path: '/admin/institute-admin'
  }, {
    icon: uri + 'ic_institute_branch.svg',
    active: uri + 'ic_institute_branch_active.svg',
    name: 'Institute Branch',
    path: '/admin/institute-branch'
  }, {
    icon: uri + 'ic_operator.svg',
    active: uri + 'ic_operator_active.svg',
    name: 'Operator Team',
    path: '/admin/operator'
  }, {
    icon: uri + 'ic_topics.svg',
    active: uri + 'ic_topics_active.svg',
    name: 'Topics',
    path: '/admin/topics'
  }, {
    icon: uri + 'ic_exams.svg',
    active: uri + 'ic_exams_active.svg',
    name: 'Exams',
    path: '/admin/exams'
  }, {
    icon: uri + 'ic_practice.svg',
    active: uri + 'ic_practice_active.svg',
    name: 'Practice Test',
    path: '/admin/practice'
  }, {
    icon: uri + 'ic_quizzes.svg',
    active: uri + 'ic_quizzes_active.svg',
    name: 'Quizzes',
    path: '/admin/quizzes'
  }, {
    icon: uri + 'ic_news.svg',
    active: uri + 'ic_news_active.svg',
    name: 'News',
    path: '/admin/news'
  },
  ]
  const instituteAdmin = [{
    icon: uri + 'ic_home.svg',
    active: uri + 'ic_home_active.svg',
    name: 'Home',
    path: '/institute/home'
  }, {
    icon: uri + 'ic_institute_branch.svg',
    active: uri + 'ic_institute_branch_active.svg',
    name: 'Institute Branch',
    path: '/institute/branch'
  }, {
    icon: uri + 'ic_institute_admin.svg',
    active: uri + 'ic_institute_admin_active.svg',
    name: 'Staff',
    path: '/institute/staff'
  }, {
    icon: uri + 'ic_student.svg',
    active: uri + 'ic_student_active.svg',
    name: 'Students',
    path: '/institute/student'
  }, {
    icon: uri + 'ic_exams.svg',
    active: uri + 'ic_exams_active.svg',
    name: 'Exams',
    path: '/institute/exams'
  }, {
    icon: uri + 'ic_announcement.svg',
    active: uri + 'ic_announcement_active.svg',
    name: 'Announcement',
    path: '/institute/announcement'
  },
  ]
  const staff = [{
    icon: uri + 'ic_home.svg',
    active: uri + 'ic_home_active.svg',
    name: 'Home',
    path: '/staff/home'
  }, {
    icon: uri + 'ic_institute_branch.svg',
    active: uri + 'ic_institute_branch_active.svg',
    name: 'Institute Branch',
    path: '/staff/branch'
  }, {
    icon: uri + 'ic_student.svg',
    active: uri + 'ic_student_active.svg',
    name: 'Students',
    path: '/staff/student'
  }, {
    icon: uri + 'ic_exams.svg',
    active: uri + 'ic_exams_active.svg',
    name: 'Exams',
    path: '/staff/exams'
  }, {
    icon: uri + 'ic_announcement.svg',
    active: uri + 'ic_announcement_active.svg',
    name: 'Announcement',
    path: '/staff/announcement'
  },
  ]
  const operator = [{
    icon: uri + 'ic_exams.svg',
    active: uri + 'ic_exams_active.svg',
    name: 'Exams',
    path: '/operator/exams'
  }, {
    icon: uri + 'ic_practice.svg',
    active: uri + 'ic_practice_active.svg',
    name: 'Practice Test',
    path: '/operator/practice'
  }, {
    icon: uri + 'ic_quizzes.svg',
    active: uri + 'ic_quizzes_active.svg',
    name: 'Quizzes',
    path: '/operator/quizzes'
  },
  ]
  const student = [{
    icon: uri + 'ic_home.svg',
    active: uri + 'ic_home_active.svg',
    name: 'Home',
    path: '/student/home'
  }, {
    icon: uri + 'ic_goals.svg',
    active: uri + 'ic_goals_active.svg',
    name: 'My Goals',
    path: '/student/goals'
  }, {
    icon: uri + 'ic_practice.svg',
    active: uri + 'ic_practice_active.svg',
    name: 'Practice Test',
    path: '/student/practice'
  }, {
    icon: uri + 'ic_exams.svg',
    active: uri + 'ic_exams_active.svg',
    name: 'Exams',
    path: '/student/exams'
  }, {
    icon: uri + 'ic_quizzes.svg',
    active: uri + 'ic_quizzes_active.svg',
    name: 'Quizzes',
    path: '/student/quizzes'
  }, {
    icon: uri + 'ic_attemped.svg',
    active: uri + 'ic_attempted_active.svg',
    name: 'Attempted',
    path: '/student/attemped'
  }, {
    icon: uri + 'ic_news.svg',
    active: uri + 'ic_news_active.svg',
    name: 'News',
    path: '/student/news'
  },
  ]
  useEffect(() => {
    if (roleStore === role.admin)
      setItemList(admin)
    if (roleStore === role.instituteAdmin)
      setItemList(instituteAdmin)
    if (roleStore === role.operator)
      setItemList(operator)
    if (roleStore === role.staff)
      setItemList(staff)
    if (roleStore === role.student)
      setItemList(student)
  }, [])

  useEffect(async () => {
    await apiAccount.detail()
      .then((res) => {
        setUsername(res.data.data.user.name)
        if (res.data.data.user.avatar !== null) {
          setAvatar(instance.pathImg + res.data.data.user.avatar)
        }
      })
  }, [])

  const onSubmit = () => {
    // code
  }

  useEffect(() => {
    const getInstitute = async () => {
      if (roleStore === role.student) {
        await apiStudentPage.listInstitute()
          .then((res) => {
            console.log(res.data.data)
            setListInstitute(res.data.data)
          })
      }
    }
    getInstitute()
  }, [])

  const joinInstitute = async () => {
    console.log(instituteSelect)
    const data = {
      institute_id: instituteSelect.institute_id,
      branch_id: instituteSelect.id
    }
    console.log(roleStore)
    if (roleStore === role.student) {
      await apiStudentPage.joinInstitute(data)
        .then((res) => {
          console.log(res.data)
          onCloseCreateModal()
        })
    }
  }

  return (
    <>
      <div className="flex bg-blue-1 md:px-12 py-2 gap-8 justify-between fixed w-full top-0 z-50">
        <div className="flex">
          <div className="md:hidden my-auto mx-2" onClick={() => {
            setActiveSidebar(!activeSidebar)
            setOpenProfile(!openProfile)
          }}>
            <FiMenu color="white" />
          </div>
          <h1 className="text-white text-2xl md:mx-4 my-auto"><Link href="/"><a> Examz.</a></Link></h1>
        </div>
        <div className="flex  gap-4 justify-center my-auto">
          {roleStore === role.student && (
            <>
              <div className="flex bg-white text-blue-1 px-2 hover:bg-black-7 rounded">
                <button className="my-auto" onClick={() =>
                  onOpenCreateModal()}>
                  Join Institute
                </button>
              </div>
              <div className={`flex mr-4  md:mr-0  `}>
                <div className="my-auto inline-flex cursor-pointer" onClick={() => { window.location.href = "/student/notification" }}>
                  <Image src="/asset/icon/sidebar/ic_notification.svg" className=" rounded-full object-cover" height={32} width={32} alt="avatar" />
                </div>
              </div>
              {/* <div className="flex mr-4 md:mr-0 bg-yellow-700 ">
                <div className="">
                  <div className="my-auto inline-flex ">
                    <Link href="/student/notification">
                      <a>
                        <Image src="/asset/icon/sidebar/ic_notification.svg" className="rounded-full my-auto  align-middle  object-cover" height={32} width={32} alt="avatar" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div> */}
            </>
          )}
          {/* <div className={`flex `}> */}
          <div className={`md:flex ${roleStore === role.student && 'hidden'} flex `}>
            <div className="my-auto inline-flex">
              <Image src={avatar} className=" rounded-full object-cover" height={32} width={32} alt="avatar" />
            </div>
            <UserDropdown username={username} />
          </div>
        </div>
      </div >

      <div className={`py-16 bg-white fixed z-40 h-screen ${activeSidebar ? '' : 'hidden'}`}>
        {roleStore === role.instituteAdmin && (
          <div className="bg-black-9 m-2 rounded-lg p-2 flex gap-4 mb-2">
            <Image src="/asset/icon/sidebar/ic_college.svg" height="32" width="32" alt="icon campus" />
            <span className="text-black-1 m-auto">Hardvard Campus</span>
          </div>
        )}
        {roleStore === role.staff && (
          <div className="bg-black-9 m-2 rounded-lg p-2 flex gap-4 mb-2">
            <Image src="/asset/icon/sidebar/ic_college.svg" height="32" width="32" alt="icon campus" />
            <span className="text-black-1 m-auto">Hardvard Campus</span>
          </div>
        )}
        <ul className="px-4 inline-block w-60 lg:inline-block">
          {itemList.map((item, index) => {
            const isActive = router.pathname.indexOf(item.path) !== -1
            return (
              <li key={index} className={` ${isActive ? 'bg-blue-1 text-white shadow-lg' : 'bg-white'} flex px-2 gap-4 mt-1 rounded-lg  inline-block block py-2 text-black-3 `} onClick={() => setActiveSidebar(!activeSidebar)}>
                <Link href={item.path}>
                  <a className="flex gap-4 inline-block cursor-pointer p-1 rounded">
                    {isActive ? (
                      <img src={item.active} alt={item.name} className=" w-4 h-4" />
                    ) : (
                      <img src={item.icon} alt={item.name} className=" w-4 h-4" />
                    )}
                    <span className="text-sm"> {item.name}</span>
                  </a>
                </Link>
              </li>
            )
          })}
          <div className={`md:hidden ${roleStore !== role.student && 'hidden'} flex gap-2 mt-4 justify-between `} onClick={() => setOpenProfile(!openProfile)}>
            <div className="flex gap-2">
              <div className="my-auto inline-flex">
                <Image src={avatar} className=" rounded-full object-cover" height={32} width={32} alt="avatar" />
              </div>
              <div className="my-auto">
                {username}
              </div>

            </div>

            <div className="my-auto right-0">
              {openProfile ? <BsChevronDown /> : <BsChevronUp />}

            </div>
          </div>
          {openProfile && (
            <>
              <section
                className={
                  " bg-white  mr-4 text-base z-50 right-0 pl-10 py-2 list-none rounded md:hidden   min-w-48 flex flex-col p-4 gap-1 "
                  // (open ? " translate-x-0 " : " translate-x-full ")
                }
              >
                <Link href='/account/profile' >
                  <a onClick={() => {
                    setActiveSidebar(false)
                  }}>
                    <button className="text-left font-medium" >Edit Profile</button>
                  </a>
                </Link>
                <Link href='/account/password'>
                  <a onClick={() => {
                    setActiveSidebar(false)
                  }}>
                    <button className="font-medium">Change Password</button>
                  </a>
                </Link>
                <button
                  className={
                    "font-medium block w-full whitespace-nowrap bg-transparent text-red-1 text-left"
                  }
                  onClick={(e) => {
                    if (window !== undefined) {
                      dispatch(reSetCurrentUser({}));
                      localStorage.removeItem('ACCESS_TOKEN')
                      Router.replace('/')
                    }
                  }}
                >
                  Logout
                </button>
              </section>
              <section
                className=" w-screen h-full cursor-pointer "
                onClick={() => {
                  setOpen(false);
                }}
              ></section>
            </>
          )}
        </ul>
      </div>

      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='sm'
        motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md"><center>Join Institute</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <input type="text" className="form border mb-4 w-1/2 p-2 text-sm rounded" placeholder="Input Topic Name" {...register("name", { required: true })} /> */}
            <div className="flex flex-wrap =">
              {listInstitute.map((item, index) => (
                <div key={index} className={`flex flex-wrap gap-4my-2 w-1/2 p-2 text-sm cursor-pointer`} onClick={() => setInstituteSelect(item)}>
                  <div className={`${item === instituteSelect ? 'bg-blue-6' : 'bg-white'}  flex  border rounded  w-full p-2 gap-2`}>
                    <img className="w-8 h-8 my-auto" src="/asset/icon/table/ic_school_orange.svg" />
                    <div>
                      <h1 className="font-bold">{item.name}</h1>
                      <p>{item.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row-reverse gap-4 mt-4">
              <div onClick={joinInstitute}>
                <Button title="Join Institute" />
              </div>
              <button type="button" className="text-black-4 px-2 hover:bg-blue-6 rounded border-blue-1 border" onClick={onCloseCreateModal}>Discard</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

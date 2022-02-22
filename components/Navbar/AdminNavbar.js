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

export default function AdminNavbar() {
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [username, setUsername] = useState()
  const roleStore = store.getState().auth.user.user.roles[0].name
  const [activeSidebar, setActiveSidebar] = useState(false)
  const router = useRouter();
  const list = [1, 2, 3, 4, 5, 6]
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


  return (
    <>
      <div className="flex bg-blue-1 md:px-12 py-2 gap-8 justify-between fixed w-full top-0 z-50">
        <div className="flex">
          <div className="md:hidden my-auto mx-2" onClick={() => setActiveSidebar(!activeSidebar)}>
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
              <div className="flex mr-4 md:mr-0">
                <div className="my-auto inline-flex align-middle">
                  <Link href="/student/notification">
                    <a>
                      <Image src="/asset/icon/sidebar/ic_notification.svg" className="rounded-full inline-block align-middle mt-2 object-cover" height={32} width={32} alt="avatar" />
                    </a>
                  </Link>
                </div>
              </div>

            </>
          )}
          <div className="md:flex hidden">
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
        </ul>
      </div>

      <Modal isOpen={isCreateModal} onClose={onCloseCreateModal} size='sm'
        motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md"><center>Join Institute</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="text" className="form border mb-4 w-1/2 p-2 text-sm rounded" placeholder="Input Topic Name" {...register("name", { required: true })} />
            <div className="flex flex-wrap =">
              {list.map((item, index) => (
                <div key={index} className="flex flex-wrap gap-4my-2 w-1/2 p-2 text-sm">
                  <div className="flex  border rounded  w-full p-2 gap-2 ">
                    <img className="w-8 h-8 my-auto" src="/asset/icon/table/ic_school_orange.svg" />
                    <div>
                      <h1 className="font-bold">Institute 1</h1>
                      <p>Yogyakarta</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row-reverse gap-4 mt-4">
              <Button title="Join Institute" />
              <button type="button" className="text-black-4 px-2 hover:bg-blue-6 rounded border-blue-1 border" onClick={onCloseCreateModal}>Discard</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

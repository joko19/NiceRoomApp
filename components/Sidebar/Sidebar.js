import { useRouter } from "next/router";
import Link from 'next/link'
import { store } from './../../redux/store'
import { useState, useEffect } from 'react'
import role from "../../redux/role";
import Image from "next/image";

function Sidebar() {
  const router = useRouter();
  const [itemList, setItemList] = useState([])
  const uri = "/asset/icon/sidebar/"
  const roleStore = store.getState().auth.user.user.roles[0].name
  const admin = [{
    icon: uri + 'ic_home.png',
    active: uri + 'ic_home_active.png',
    name: 'Home',
    path: '/admin/dashboard'
  }, {
    icon: uri + 'ic_institute.png',
    active: uri + 'ic_institute_active.png',
    name: 'Institute',
    path: '/admin/institution'
  }, {
    icon: uri + 'ic_institute_admin.png',
    active: uri + 'ic_institute_admin_active.png',
    name: 'Institute Admin',
    path: '/admin/institute-admin'
  }, {
    icon: uri + 'ic_institute_branch.png',
    active: uri + 'ic_institute_branch_active.png',
    name: 'Institute Branch',
    path: '/admin/institute-branch'
  }, {
    icon: uri + 'ic_operator.png',
    active: uri + 'ic_operator_active.png',
    name: 'Operator Team',
    path: '/admin/operator'
  }, {
    icon: uri + 'ic_topics.png',
    active: uri + 'ic_topics_active.png',
    name: 'Topics',
    path: '/admin/topics'
  }, {
    icon: uri + 'ic_exams.png',
    active: uri + 'ic_exams_active.png',
    name: 'Exams',
    path: '/admin/exams'
  }, {
    icon: uri + 'ic_practice.png',
    active: uri + 'ic_practice_active.png',
    name: 'Practice Test',
    path: '/admin/practice'
  }, {
    icon: uri + 'ic_quizzes.png',
    active: uri + 'ic_quizzes_active.png',
    name: 'Quizzes',
    path: '/admin/quizzes'
  }, {
    icon: uri + 'ic_news.png',
    active: uri + 'ic_news_active.png',
    name: 'News',
    path: '/admin/news'
  },
  ]
  const instituteAdmin = [{
    icon: uri + 'ic_home.png',
    active: uri + 'ic_home_active.png',
    name: 'Home',
    path: '/institute/home'
  }, {
    icon: uri + 'ic_institute_branch.png',
    active: uri + 'ic_institute_branch_active.png',
    name: 'Institute Branch',
    path: '/institute/branch'
  }, {
    icon: uri + 'ic_institute_admin.png',
    active: uri + 'ic_institute_admin_active.png',
    name: 'Staff',
    path: '/institute/staff'
  }, {
    icon: uri + 'ic_student.png',
    active: uri + 'ic_student_active.png',
    name: 'Students',
    path: '/institute/student'
  }, {
    icon: uri + 'ic_exams.png',
    active: uri + 'ic_exams_active.png',
    name: 'Exams',
    path: '/institute/exams'
  }, {
    icon: uri + 'ic_announcement.png',
    active: uri + 'ic_announcement_active.png',
    name: 'Announcement',
    path: '/institute/announcement'
  },
  ]
  const staff = [{
    icon: uri + 'ic_home.png',
    active: uri + 'ic_home_active.png',
    name: 'Home',
    path: '/staff/home'
  }, {
    icon: uri + 'ic_institute_branch.png',
    active: uri + 'ic_institute_branch_active.png',
    name: 'Institute Branch',
    path: '/staff/branch'
  }, {
    icon: uri + 'ic_student.png',
    active: uri + 'ic_student_active.png',
    name: 'Students',
    path: '/staff/student'
  }, {
    icon: uri + 'ic_exams.png',
    active: uri + 'ic_exams_active.png',
    name: 'Exams',
    path: '/staff/exams'
  }, {
    icon: uri + 'ic_announcement.png',
    active: uri + 'ic_announcement_active.png',
    name: 'Announcement',
    path: '/staff/announcement'
  },
  ]
  const operator = [{
    icon: uri + 'ic_exams.png',
    active: uri + 'ic_exams_active.png',
    name: 'Exams',
    path: '/operator/exams'
  }, {
    icon: uri + 'ic_practice.png',
    active: uri + 'ic_practice_active.png',
    name: 'Practice Test',
    path: '/operator/practice'
  }, {
    icon: uri + 'ic_quizzes.png',
    active: uri + 'ic_quizzes_active.png',
    name: 'Quizzes',
    path: '/operator/quizzes'
  },
  ]
  useEffect(() => {
    if (router.pathname.startsWith("/admin") && roleStore === role.admin)
      setItemList(admin)
    if (router.pathname.startsWith("/institute") && roleStore === role.instituteAdmin)
      setItemList(instituteAdmin)
    if (router.pathname.startsWith("/operator") && roleStore === role.operator)
      setItemList(operator)
    if (router.pathname.startsWith("/staff") && roleStore === role.staff)
      setItemList(staff)
  }, [])
  return (
    <div className="py-16 bg-white h-full">
      {router.pathname.startsWith("/institute") && roleStore === role.instituteAdmin && (
        <div className="bg-black-9 m-2 rounded-lg p-4 flex gap-4 mb-8">
          <Image src="/asset/icon/sidebar/ic_college.png" height="48" width="48" alt="icon campus" />
          <span className="text-black-1 m-auto">Hardvard Campus</span>
        </div>
      )}
      {router.pathname.startsWith("/staff") && roleStore === role.staff && (
        <div className="bg-black-9 m-2 rounded-lg p-4 flex gap-4 mb-8">
          <Image src="/asset/icon/sidebar/ic_college.png" height="48" width="48" alt="icon campus" />
          <span className="text-black-1 m-auto">Hardvard Campus</span>
        </div>
      )}
      <ul className="px-4 inline-block w-60 lg:inline-block hidden">
        {itemList.map((item, index) => {
          const isActive = router.pathname.indexOf(item.path) !== -1
          return (
            <li key={index} className={` ${isActive ? 'bg-blue-1 text-white shadow-lg' : 'bg-white'} flex px-2 gap-4 mt-1 rounded-lg  inline-block block py-2 text-black-3 `}>
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
  )
}

export default Sidebar
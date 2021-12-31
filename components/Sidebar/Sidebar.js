import { useRouter } from "next/router";
import Link from 'next/link'

function Sidebar() {
  const router = useRouter();
  const uri = "/asset/icon/sidebar/"
  const list = [{
    icon: uri + 'ic_home.png',
    active: uri + 'ic_home.png',
    name: 'Home',
    path: '/dashboard'
  }, {
    icon: uri + 'ic_institute.png',
    active: uri + 'ic_institute_active.png',
    name: 'Institute',
    path: '/institution'
  }, {
    icon: uri + 'ic_institute_admin.png',
    active: uri + 'ic_institute_admin_active.png',
    name: 'Institute Admin',
    path: '/institute-admin'
  }, {
    icon: uri + 'ic_institute_branch.png',
    active: uri + 'ic_institute_branch_active.png',
    name: 'Institute Branch',
    path: '/institute-branch'
  }, {
    icon: uri + 'ic_topics.png',
    active: uri + 'ic_topics_active.png',
    name: 'Topics',
    path: '/topics'
  }, {
    icon: uri + 'ic_exams.png',
    active: uri + 'ic_exams_active.png',
    name: 'Exams',
    path: '/exams'
  }, {
    icon: uri + 'ic_quizzes.png',
    active: uri + 'ic_quizzes_active.png',
    name: 'Quizzes',
    path: '/quizzes'
  }, {
    icon: uri + 'ic_news.png',
    active: uri + 'ic_news_active.png',
    name: 'News',
    path: '/news'
  },
  ]
  return (
    <>
      <ul className="py-24 px-4 inline-block bg-white h-full lg:inline-block hidden">
        {list.map((item) => {
          const isActive = router.pathname.indexOf(item.path) !== -1
          return (
            <li key={item} className={` ${isActive ? 'bg-blue-1 text-white shadow-lg' : 'bg-white'} flex px-1 gap-4 mt-4 rounded-lg  inline-block block py-1 text-black-3 `}>
              <Link href={'/admin' + item.path}>
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
    </>
  )
}

export default Sidebar
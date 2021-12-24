import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import UserDropdown from '../Dropdowns/UserDropdown';

function Header(props) {
  const menu = [
    {
      id: 0,
      slug: '/quizzes',
      name: 'Quizzes'
    },
    {
      id: 1,
      slug: '/prev-paper',
      name: 'Prev Paper'
    },
    {
      id: 2,
      slug: '/upcoming-exam',
      name: 'Upcoming Exam'
    },
    {
      id: 3,
      slug: '/exam',
      name: 'Exam'
    },
  ]
  const { pathname } = useRouter();
  return (
    <div className="flex bg-blue-1 md:px-12 py-4 gap-8 justify-between fixed w-full top-0 z-50">
      <h1 className="text-white text-4xl mx-4"><Link href="/landing"><a> Examz.</a></Link></h1>
      {!props.name && (
        <div>
        <ul className="pt-4 hidden md:flex text-white flex flex-row gap-5">
          {menu.map((item) => {
            const status = {
              color : item.slug === pathname ? 'text-yellow-1 font-bold border-b border-yellow-1' : 'text-white'
            } 
            return(
            <li key={item.id} className={status.color}><Link href={item.slug}><a>{item.name}</a></Link></li>
          )})}
        </ul>
      </div> 
      )}
      <div className="hidden md:flex gap-4 justify-center">

        {props.name ? (
          <>
            <img src="/asset/icon/ic_profile.png" alt="photo profile" />
            <UserDropdown username={props.name} />
          </>) : (
          <>
            <button className="bg-white text-blue-1 rounded-lg p-3 mx-4">Select Category</button>
            <button className="text-white border rounded-lg p-3">Register</button>
          </>
        )}
      </div>
    </div >
  )
}

export default Header
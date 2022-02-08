import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import apiExam from "../../action/exam";
import { Select } from '@chakra-ui/react'
import Button from "../Button/button";

function Header(props) {
  const [active, setActive] = useState(false);
  const [category, setCategory] = useState([])
  const handleClick = () => {
    setActive(!active);
  };
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
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(async () => {
    await apiExam.AllCategory()
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className="flex hidden md:flex bg-blue-1 md:px-12 py-4 gap-8 md:justify-between fixed w-full top-0 z-50">
        <h1 className="text-white text-3xl mx-4"><Link href="/landing"><a> Examz.</a></Link></h1>

        <div>
          <ul className="pt-4 hidden md:flex text-white flex md:flex-row flex-col gap-5">
            {menu.map((item) => {
              const status = {
                color: item.slug === pathname ? 'text-yellow-1 font-bold border-b border-yellow-1' : 'text-white'
              }
              return (
                <li key={item.id} className={status.color}><Link href={item.slug}><a>{item.name}</a></Link></li>
              )
            })}
          </ul>
        </div>

        <div className="md:flex hidden md:flex-row flex-col gap-4 justify-center">
          <Select defaultValue="Select Category" placeholder="Select Category" bg='white' className="text-blue-1" size="md" variant='outline' iconColor="blue">
            {category.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </Select>
          <Button title="Register" href="landing#register" />
        </div>
      </div >

      {/* Mobile */}

      <nav className='flex md:hidden items-center shadow-lg flex-wrap fixed text-black  bg-blue-1 p-3 w-screen z-20 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 gap-4'>
            <span className="text-white text-4xl mx-4">
              Examz.
            </span>
          </a>
        </Link>
        <button
          className=' inline-flex p-3  rounded lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <img className='h-8' src="https://img.icons8.com/fluency/48/000000/menu-2.png" />
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${active ? '' : 'hidden'
            }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto text-right w-full z-20 lg:items-center items-start  flex flex-col lg:h-auto'>
            {menu.map((item) => (
              <Link key={item.id} href={item.slug}>
                <a className='lg:inline-flex lg:w-auto text-white w-full px-3 py-2 rounded  font-bold items-center justify-center hover:border-b hover:text-blue-500'>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* <main
        className={
          "fixed overflow-hidden w-full z-100 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (open
            ? " opacity-100  "
            : "  opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            " bg-white mt-12 mr-4 text-base z-50 right-0 float-right py-2 list-none rounded shadow-lg min-w-48 flex flex-col p-4 gap-1 "
            // (open ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <Link href='/account/profile' >
            <a onClick={() => setOpen(false)}>
              <button className="text-left font-medium" onClick={closeDropdownPopover}>Edit Profile</button>
            </a>
          </Link>
          <Link href='/account/password'>
            <a onClick={() => setOpen(false)}>
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
      </main> */}
    </>
  )
}

export default Header
import React from "react";
import Link from 'next/link'
import Image from "next/image";
import UserDropdown from "../Dropdowns/UserDropdown.js";
import instance from "../../action/instance.js";
import apiAccount from "../../action/account.js";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [username, setUsername] = useState()

  useEffect(async () => {
    await apiAccount.detail()
      .then((res) => {
        setUsername(res.data.data.user.name)
        if (res.data.data.user.avatar !== null) {
          setAvatar(instance.pathImg + res.data.data.user.avatar)
        }
      })
  }, [])

  return (
    <>
      <div className="flex bg-blue-1 md:px-12 py-2 gap-8 justify-between fixed w-full top-0 z-50">
        <h1 className="text-white text-2xl mx-4 my-auto"><Link href="/"><a> Examz.</a></Link></h1>
        <div className=" md:flex gap-4 justify-center my-auto">
          <div className="flex my-auto">
            <div className="rounded-full">
              <Image src={avatar} className="rounded-full object-cover" height={32} width={32} alt="avatar" />
            </div>
            <UserDropdown username={username} />
          </div>
        </div>
      </div >
    </>
  );
}

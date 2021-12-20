import React from "react";
import Link from 'next/link'
import Image from "next/image";
import UserDropdown from "../Dropdowns/UserDropdown.js";
import instance from "../../action/instance.js";

export default function AdminNavbar(props) {
  const blankProfile = '/asset/img/blank_profile.png'
  return (
    <>
      <div className="flex bg-blue-1 md:px-12 py-4 gap-8 justify-between fixed w-full top-0 z-50">
        <h1 className="text-white text-4xl mx-4"><Link href="/"><a> Examz.</a></Link></h1>

        <div className=" md:flex gap-4 justify-center">
          <div className="flex">
            <div className="rounded-full">
              <Image src={props.avatar !== null ? instance.pathImg + props.avatar : blankProfile} className="rounded-full object-cover" height={32} width={32} alt="avatar" />
            </div>
            {/* <div> */}
              <UserDropdown username={props.user} />
            {/* </div> */}
          </div>
        </div>
      </div >
    </>
  );
}

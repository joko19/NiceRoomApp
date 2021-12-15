import React from "react";
import Link from 'next/link'

import UserDropdown from "../Dropdowns/UserDropdown.js";

export default function AdminNavbar({ user = null }) {
  return (
    <>

      <div className="flex bg-blue-1 md:px-12 py-4 gap-8 justify-between fixed w-full top-0 z-50">
        <h1 className="text-white text-4xl mx-4"><Link href="/"><a> Examz.</a></Link></h1>
       
        <div className=" md:flex gap-4 justify-center">
            <div className="flex">
              <img src="/asset/icon/ic_profile.png" alt="photo profile" />
              <UserDropdown username={user} />
            </div>
        </div>
      </div >
    </>
  );
}

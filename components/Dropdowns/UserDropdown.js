import React, { useEffect, useMemo, useState } from "react";
import { createPopper } from "@popperjs/core";
import { FiChevronDown, FiX } from 'react-icons/fi'
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { reSetCurrentUser } from "../../action/auth/authAction";
import Link from 'next/link'

const UserDropdown = (props) => {
  const Router = useRouter()
  const dispatch = useDispatch()
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex space-x-5 text-white py-2 text-east-bay-500">
          {/* <span className="w-12 h-12 text-sm bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="rounded-full align-middle border-none shadow-lg w-8 h-8"
              src="/img/team-1-800x800.jpg"
            />
          </span> */}
          <span className="ml-4">{props.username || ''}</span>
          <FiChevronDown size={16} />
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none rounded shadow-lg min-w-48 flex flex-col p-4 gap-1  "
        }
      >
        <Link href='/account/profile'>
          <a>
            <button className="text-left font-medium" onClick={closeDropdownPopover}>Edit Profile</button>
          </a>
        </Link>
        <Link href='/account/password'>
          <a>
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
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  ...state.auth
});
export default connect(mapStateToProps)(UserDropdown);

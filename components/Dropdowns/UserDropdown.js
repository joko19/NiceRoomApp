import React, {useEffect, useMemo, useState} from "react";
import { createPopper } from "@popperjs/core";
import { FiChevronDown, FiX } from 'react-icons/fi'
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { reSetCurrentUser } from "../../action/auth/authAction";

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
          <span>{props.username || ''}</span>
          <FiChevronDown size={16} />
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            if(window !== undefined) {
              dispatch(reSetCurrentUser({}));
              localStorage.removeItem('ACCESS_TOKEN')
              Router.replace('/')
            }
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  ...state.auth
});
export default connect(mapStateToProps)(UserDropdown);

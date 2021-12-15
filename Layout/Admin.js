import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import {admin} from './../redux/privateRoute'

function Admin(props) {
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <AdminNavbar />
        <div className="px-2 md:px-10 mx-auto w-full -m-24">
          {props.children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  )
}

const withAuth =  admin(Admin)
withAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withAuth);

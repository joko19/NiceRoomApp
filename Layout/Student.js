import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import { student } from '../redux/privateRoute'
import Footer from "../components/footer/footer";

function Student(props) {
console.log(props.auth)
  return (
    <>
      <div className="wrapper bg-black-8">
        <AdminNavbar user={props.auth.isAuthenticated && props.auth.user.user.name } avatar={props.auth.isAuthenticated && props.auth.user.user.avatar}/>
        <div className="flex">
          <div className="px-2 md:px-10 w-full overflow-hidden p-8 grow">
            {props.children}
            {/* <FooterAdmin /> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

const withAuth = student(Student)
withAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withAuth);
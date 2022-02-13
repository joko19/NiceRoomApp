import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import privateRoute from '../redux/privateRoute'
import Footer from "../components/footer/footer";
import { store } from "../redux/store";

function Layout(props) {
  return (
    <>
      <div className="wrapper bg-black-8 min-h-screen">
        <AdminNavbar user={props.auth.isAuthenticated ? props.auth.user.user.name : ''} avatar={props.auth.isAuthenticated && props.auth.user.user.avatar}/>
        <div className="flex">
          <div className="flex-none grow-0 bg-white h-full">
            <Sidebar />
          </div>
          <div className="px-8 ml-64 w-full overflow-hidden p-8 grow">
            {props.children}
            {/* <FooterAdmin /> */}
          </div>
        </div>
      </div>
    </>
  )
}

const withAuth = privateRoute(Layout)

withAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withAuth);

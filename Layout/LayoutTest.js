import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import AdminNavbar from "../components/Navbar/AdminNavbar";
import privateRoute from '../redux/privateRoute'
import { store } from "../redux/store";

function LayoutTest(props) {
  return (
    <>
      <div className="wrapper bg-black-8 min-h-screen">
        <AdminNavbar user={props.auth.isAuthenticated ? props.auth.user.user.name : ''} avatar={props.auth.isAuthenticated && props.auth.user.user.avatar} />
        <div className="flex">
          <div className="w-full pl-4  pt-8 pr-4 grow">
            {props.children}
            {/* <FooterAdmin /> */}
          </div>
        </div>
      </div>
    </>
  )
}

const withAuth = privateRoute(LayoutTest)

withAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withAuth);

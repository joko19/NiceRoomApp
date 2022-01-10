import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import Footer from '../components/footer/footer'
import Header from '../components/Navbar/header';
import apiAuth from './api/auth'
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from '../action/auth/authAction'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Home(props) {

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      window.location.href = '/landing'
    } else {
      if (props.auth.user.user.roles[0].name === 'SA') {
        window.location.href = '/admin/dashboard'
      } else if (props.auth.user.user.roles[0].name === 'ST') {
        window.location.href = '/student'
      }
    }
  }, [])
  return (
    <div className='text-center mt-12'>
      Loading...
    </div>
  )
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser, registerUser })(Home);

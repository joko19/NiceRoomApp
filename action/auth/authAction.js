import setAuthToken from "./setAuthToken";

import {GET_ERRORS, RESET_CURRENT_USER, SET_CURRENT_USER, USER_LOADING } from "./../../redux/reducers/types";
import instance from './../instance'
import * as jwt from 'jsonwebtoken'

export const loginUser = (data) => (dispatch) => {
  console.log(data)
  instance.noAuth.post('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((result) => {
      if (result.status) {
        console.log(result.data.data)
        const { access_token } = result.data.data;
        console.log(access_token)
        localStorage.setItem('ACCESS_TOKEN', access_token)
        setAuthToken(access_token)
        dispatch(setCurrentUser(result.data.data));
        dispatch(setUserLoading(false))
        window.location.href = '/admin/dashboard'
      }
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
    })
}

export const loginFacebook = (path) => (dispatch) => {
  console.log("facebook")
  instance.noAuth.get('/auth/social/facebook/callback' + path)
    .then((result) => {
      if (result.status) {
        console.log(result)
        const { token } = result.data.data;
        localStorage.setItem('ACCESS_TOKEN', token)
        setAuthToken(token)
        dispatch(setCurrentUser(result.data.data));
        dispatch(setUserLoading(false))
        window.location.href = '/admin/dashboard'
      }
    })
}

export const loginGoogle = (path) => (dispatch) => {
  console.log("hello google")
  console.log(path)
  instance.noAuth.get('/auth/social/google/callback' + path)
    .then((result) => {
      if (result.status) {
        console.log(result)
        const { token } = result.data.data;
        localStorage.setItem('ACCESS_TOKEN', token)
        setAuthToken(token)
        dispatch(setCurrentUser(result.data.data));
        dispatch(setUserLoading(false))
        window.location.href = '/admin/dashboard'
      }
    })
}

export const registerUser = (data) => (dispatch) => {
  console.log(data)
  dispatch(setUserLoading(true))
  instance.noAuth.post('/auth/register', data, {
    headers: {
      'Content_Type': 'application/json',
    }
  })
    .then((res) => {
      if (res.status) {
        const { token } = res.data.data;
        localStorage.setItem('ACCESS_TOKEN', token)
        setAuthToken(token)
        dispatch(setCurrentUser(res.data.data));
        dispatch(setUserLoading(false))
        window.location.href = '/admin/dashboard'
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(setErrors(err.response.data))
      dispatch(setUserLoading(false))
    })
}

// set error
export const setErrors = (data) => {
  return{
    type: GET_ERRORS,
    payload: data
  }
}

// Set logged in user
export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
};

export const reSetCurrentUser = () => {
  return {
    type: RESET_CURRENT_USER,
    payload: {},
  };
};

// User loading
export const setUserLoading = (payload) => {
  return {
    type: USER_LOADING,
    payload
  };
};
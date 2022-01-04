import setAuthToken from "./setAuthToken";

import { GET_ERRORS, RESET_CURRENT_USER, SET_CURRENT_USER, USER_LOADING } from "./../../redux/reducers/types";
import instance from './../instance'
import * as jwt from 'jsonwebtoken'

const login = (data) => instance.noAuth.post('/auth/login', data, {
  headers: {
    'Content-Type': 'application/json'
  }
})

const register = (data) => instance.noAuth.post('/auth/register', data, {
  headers: {
    'Content_Type': 'application/json',
  }
})

const apiAuth = {
  login,
  register
}

export default apiAuth

export const loginUser = (result) => (dispatch) => {
  if (result.status) {
    const role = result.data.data.user.roles[0].name
    const { access_token } = result.data.data;
    localStorage.setItem('ACCESS_TOKEN', access_token)
    setAuthToken(access_token)
    dispatch(setCurrentUser(result.data.data));
    dispatch(setUserLoading(false))
    if (role === 'st') {
      window.location.href = '/student'
    } else if (role === 'sa') {
      window.location.href = '/admin/dashboard'
    }
  }
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

export const registerUser = (res) => (dispatch) => {
  if (res.status) {
    const { token } = res.data.data;
    localStorage.setItem('ACCESS_TOKEN', token)
    setAuthToken(token)
    dispatch(setCurrentUser(res.data.data));
    dispatch(setUserLoading(false))
    window.location.href = '/landing'
  }
}

// set error
export const setErrors = (data) => {
  return {
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
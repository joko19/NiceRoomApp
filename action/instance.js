import axios from 'axios'
import {store} from '../redux/store'
import { reSetCurrentUser } from "./auth/authAction";

const noAuth = axios.create({ baseURL: "https://exams.vieproject.xyz/api", withCredentials: true});

const auth = axios.create({
  baseURL: "https://exams.vieproject.xyz/api",
  headers: {
    'Content_Type': 'application/json',
    authorization: 'Bearer ' + store.getState().auth.user.access_token
  }
})


auth.interceptors.response.use(function (res) {
  return res;
}, function (error) {
  if(error.response.status === 401)
    store.dispatch(reSetCurrentUser())
    
  return Promise.reject(error);
});

const instance ={
  noAuth,
  auth
}

export default instance
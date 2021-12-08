import axios from 'axios'

const instance = axios.create({ baseURL: "https://exams.vieproject.xyz/api", withCredentials: true});

export default instance
import axios from 'axios'

const instance = axios.create({ baseURL: "https://exams.vieproject.xyz", withCredentials: true});

export default instance
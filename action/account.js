import instance from './instance'

const updateProfile = (data) => instance.authwithFile.post('/update-profile?_method=PUT', data)
const changepassword = (data) => instance.auth.put('/update-password', data)

const apiAccount = {
  updateProfile,
  changepassword
}

export default apiAccount
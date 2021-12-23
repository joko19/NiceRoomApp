import instance from './instance'

const detail = () => instance.auth('/auth/profile')
const updateProfile = (data) => instance.authwithFile.post('/update-profile?_method=PUT', data)
const changepassword = (data) => instance.auth.put('/update-password', data)

const apiAccount = {
  detail,
  updateProfile,
  changepassword
}

export default apiAccount
import instance from './instance'

const updateProfile = (data) => instance.authwithFile.post('update-profile?_method=PUT', data)

const apiAccount = {
  updateProfile
}

export default apiAccount
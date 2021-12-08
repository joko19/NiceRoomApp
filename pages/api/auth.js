import instance from './instance'

const loginGoogle = () => instance.get('/api/auth/social/google')
const callbackGoogle = (path) => instance.get('/api/auth/social/google/callback' + path)
const loginFacebook = () => instance.get('/api/auth/social/facebook')
const callbackFacebook = (path) => instance.get('/api/auth/social/facebook/callback' + path)

const register = (data) => instance.post('/auth/register', data, {
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiAuth = {
  loginGoogle,
  callbackGoogle,
  loginFacebook,
  callbackFacebook,
  register
}

export default apiAuth
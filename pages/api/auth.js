import instance from './instance'

const loginGoogle = () => instance.get('/api/auth/social/google')
const callbackGoogle = (path) => instance.get('/api/auth/social/google/callback' + path)

const apiAuth = {
  loginGoogle,
  callbackGoogle
}

export default apiAuth
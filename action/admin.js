import instance from './instance'

const all = () => instance.auth.get('/institute/admin')

const apiAdmin = {
  all
}

export default apiAdmin
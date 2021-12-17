import instance from './instance'

const all = () => instance.auth.get('/institute/admin')
const deleted = (id) => instance.auth.delete('/institute/admin/' + id)

const apiAdmin = {
  all,
  deleted
}

export default apiAdmin
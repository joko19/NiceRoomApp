import instance from './instance'

const create = (data) => instance.auth.post('/institute/admin', data)
const all = (search, limit, page) => instance.auth.get('/institute/admin?search=' + search + '&limit=' + limit + '&page=' + page)
const deleted = (id) => instance.auth.delete('/institute/admin/' + id)

const apiAdmin = {
  create,
  all,
  deleted
}

export default apiAdmin
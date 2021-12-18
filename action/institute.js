import instance from './instance'

const create = (data) => instance.auth.post('/institute', data)
const all = (search, limit, page) => instance.auth.get('/institute?search=' + search + '&limit=' + limit + '&page=' + page)
const detail = (id) => instance.auth.get('/institute/' + id)
const update = (id, data) => instance.auth.post('/institute/' + id + "?_method=PUT", data)
const deleted = (id) => instance.auth.delete('/institute/' + id)

const apiInstitute = {
  create,
  all,
  detail,
  update,
  deleted
}

export default apiInstitute
import instance from './instance'

const create = (data) => instance.auth.post('/institute', data)
const all = (search, limit, page) => instance.auth.get('/institute?search=' + search + '&limit=' + limit + '&page=' + page)
const deleted = (id) => instance.auth.delete('/institute/' + id)

const apiInstitute = {
  create,
  all,
  deleted
}

export default apiInstitute
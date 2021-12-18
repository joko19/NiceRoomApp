import instance from './instance'

const create = (data) => instance.auth.post('/institute', data)
const all = () => instance.auth.get('/institute')
const deleted = (id) => instance.auth.delete('/institute/' + id)

const apiInstitute = {
  create,
  all,
  deleted
}

export default apiInstitute
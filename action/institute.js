import instance from './instance'

const all = () => instance.auth.get('/institute')
const deleted = (id) => instance.auth.delete('/institute/' + id)

const apiInstitute = {
  all,
  deleted
}

export default apiInstitute
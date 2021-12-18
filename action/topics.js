import instance from './instance'

const create = (topic) => instance.auth.post('/topic', topic)
const all = () => instance.auth.get('/topic')
const deleted = (id) => instance.auth.delete('/topic/' + id)

const apiTopic = {
  create,
  all,
  deleted
}

export default apiTopic
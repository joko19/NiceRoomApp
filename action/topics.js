import instance from './instance'

const all = () => instance.auth.get('/topic')
const deleted = (id) => instance.auth.delete('/topic/' + id)

const apiTopic = {
  all,
  deleted
}

export default apiTopic
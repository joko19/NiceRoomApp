import instance from './instance'

const all = () => instance.auth.get('/topic')

const apiTopic = {
  all
}

export default apiTopic
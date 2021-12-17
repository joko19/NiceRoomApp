import instance from './instance'

const all = () => instance.auth.get('/news')
const deleted = (id) => instance.auth.delete('/news/' + id)

const apiNews = {
  all,
  deleted
}

export default apiNews
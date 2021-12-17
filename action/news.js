import instance from './instance'

const all = () => instance.auth.get('/news')

const apiNews = {
  all
}

export default apiNews
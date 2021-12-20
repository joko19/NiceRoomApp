import instance from './instance'

const create = (data) => instance.authwithFile.post('/news', data)
const all = (search, limit, page) => instance.auth.get('/news?search=' + search + '&limit=' + limit + '&page=' + page)
const deleted = (id) => instance.auth.delete('/news/' + id)

const apiNews = {
  create,
  all,
  deleted
}

export default apiNews
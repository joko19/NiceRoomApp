import instance from './instance'

const create = (data) => instance.authwithFile.post('/quiz', data)
const index = (search, type, status, limit, page) => instance.auth.get('/quiz?search=' + search + '&type=' + type +  '&status=' + status + '&limit=' + limit + '&page=' + page)
const deleted = (id) => instance.auth.delete('/quiz/' + id)
const detail = (id) => instance.auth.get('/quiz/' + id)
const update = (id, data) => instance.authwithFile.post('/quiz/' + id + '?_method=PUT', data)

const apiQuiz = {
  create,
  index,
  detail,
  update,
  deleted,
}

export default apiQuiz
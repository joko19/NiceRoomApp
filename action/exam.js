import instance from './instance'

const AllCategory = () => instance.noAuth.get('/exam-category')
const create = (data) => instance.auth.post('/exam', data)
const index = (search, type, status, limit, page) => instance.auth.get('/exam?search=' + search + '&type=' + type +  '&status=' + status + '&limit=' + limit + '&page=' + page)
const deleted = (id) => instance.auth.delete('/exam/' + id)
const detail = (id) => instance.auth.get('/exam/' + id)
const update = (id, data) => instance.auth.post('/exam/' + id + '?_method=PUT', data)

const apiExam = {
  AllCategory,
  create,
  index,
  detail,
  update,
  deleted,
}

export default apiExam
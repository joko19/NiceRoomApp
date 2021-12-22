import instance from './instance'

const index = (search, limit, page) => instance.auth.get('/branch?search=' + search + '&limit=' + limit + '&page=' + page)
const create = (data) => instance.auth.post('/branch', data)
const detail = (id) => instance.auth.get('/branch/' + id)
const update = (id, data) => instance.auth.post('/branch/' + id + "?_method=PUT", data)
const deleted = (id) => instance.auth.delete('/branch/' + id)

const apiBranch = {
  index,
  create,
  detail,
  update,
  deleted
}

export default apiBranch
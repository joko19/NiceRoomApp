import instance from './instance'

const notification = (limit, page) => instance.auth.get('/students/notifications?limit=' + limit + '&page=' + page)
const notificationRead = () => instance.auth.get('/students/notifications/read')
const indexNews = () => instance.auth.get('/students/news')
const showNews = (id) => instance.auth.get('/students/news/' + id)
const showExams = (id) => instance.auth.get('/students/exams/' + id)
const examsLiveAll = () => instance.auth.get('/students/exams-live')
const examsLiveTake = (total) => instance.auth.get('/students/exams-live?take=' + total)
const storeExams = (slug, data) => instance.auth.post('/students/exams/' + slug, data)

const apiStudentPage = {
  notification,
  notificationRead,
  indexNews,
  showExams,
  showNews,
  examsLiveAll,
  examsLiveTake,
  storeExams
}

export default apiStudentPage
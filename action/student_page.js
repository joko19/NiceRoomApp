import instance from './instance'

const notification = (limit, page) => instance.auth.get('/students/notifications?limit' + limit + '&page=' + page)
const notificationRead = () => instance.auth.get('/students/notifications/read')
const indexNews = () => instance.auth.get('/students/news')
const showNews = (id) => instance.auth.get('/students/news/' + id)
const showExams = (id) => instance.auth.get('/students/exams/' + id)
const examsLiveAll = () => instance.auth.get('/students/exams-live')
const examsLiveTake = (id) => instance.auth.get('/students/exams-live?take=' + id)

const apiStudentPage = {
  notification,
  notificationRead,
  indexNews,
  showExams,
  showNews,
  examsLiveAll,
  examsLiveTake
}

export default apiStudentPage
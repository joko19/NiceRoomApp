import instance from './instance'

const indexNews = (take) => instance.noAuth.get('/landing/news?take=' + take)
const showNews = (slug) => instance.noAuth.get('/landing/news/' + slug)
const quizLive = (take) => instance.noAuth.get('/landing/quizzes-live?take=' + take)
const quizPrevious = (take) => instance.noAuth.get('/landing/quizzes-previous?take=' + take)
const showPrevious = (slug, take) => instance.noAuth.get('/landing/quizzes-previous/' + slug +'?take=' +take)
const ExamsLive = (take, category) => instance.noAuth.get('/landing/exams-live?category=' + category + '&take=' + take)
const ExamsUpcoming = (take, category) => instance.noAuth.get('/landing/exams-upcoming?category=' + category + '&take=' + take)
const ExamsByType = (take, category) => instance.noAuth.get('/landing/exams-type?category=' + category + '&take=' + take)

const apiLanding = {
  indexNews,
  showNews,
  quizLive,
  quizPrevious,
  showPrevious,
  ExamsLive,
  ExamsUpcoming,
  ExamsByType
}

export default apiLanding
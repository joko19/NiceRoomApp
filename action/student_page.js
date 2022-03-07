import instance from './instance'

const notification = (limit, page) => instance.auth.get('/students/notifications?limit=' + limit + '&page=' + page)
const notificationRead = () => instance.auth.get('/students/notifications/read')
const indexNews = () => instance.auth.get('/students/news')
const showNews = (id) => instance.auth.get('/students/news/' + id)
const showExams = (slug) => instance.auth.get('/students/exams/' + slug)
const examsLiveAll = () => instance.auth.get('/students/exams-live')
const examsLiveTake = (total) => instance.auth.get('/students/exams-live?take=' + total)
const examsRecomendedAll = () => instance.auth.get('/students/exams-recommended')
const examsRecomendedTake = (total) => instance.auth.get('/students/exams-recommended?take=' + total)
const examsUpcomingAll = () => instance.auth.get('/students/exams-upcoming')
const examsUpcomingTake = (total) => instance.auth.get('/students/exams-upcoming?take=' + total)
const examsAttemptedAll = () => instance.auth.get('/students/exams-attempted')
const examsAttemptedTake = (total) => instance.auth.get('/students/exams-attempted?take=' + total)
const examsPrevious = () => instance.auth.get('/students/exams-previous')
const examsGraph = () => instance.auth.get('/students/exams-graph')
const examsGraphFilterDate = (date) => instance.auth.get('/students/exams-graph?date=' + date)
const storeExams = (slug, data) => instance.auth.post('/students/exams/' + slug, data)
const showExamsResult = (slug, id) => instance.auth.get('/students/exams/' + slug + '/result/' + id)

const storePractice = (slug, data) => instance.auth.post('/students/practice/' + slug, data)
const showPractice = (slug) => instance.auth.get('/students/practices/' + slug)
const practiceAll = () => instance.auth.get('/students/practices')
const practiceTake = (total) => instance.auth.get('/students/practices?take=' + total)
const practiceAttemptedAll = () => instance.auth.get('/students/practices-attempted')
const practiceAttemptedTake = (total) => instance.auth.get('/students/practices-attempted?take=' + total)
const showPracticeResult = (slug, id) => instance.auth.get('/students/practices/' + slug + '/result/' + id)

const storeQuiz = (slug, data) => instance.auth.post('/students/quizzes/' + slug, data)
const showQuiz = (slug) => instance.auth.get('/students/quizzes/' + slug)
const QuizAll = (take, topic) => instance.auth.get('/students/quizzes?take=' + take + '&topic=' + topic)
const QuizLiveAll = (take, topic) => instance.auth.get('/students/quizzes-live?take=' + take + '&topic=' + topic)
const QuizAttemptedAll = (take) => instance.auth.get('/students/quizzes-attempted?take=' + take)
const showQuizResult = (slug, id) => instance.auth.get('/students/quizzes/' + slug + '/result/' + id)

const instituteExams = (take) => instance.auth.get('/students/institutes/exams?take=' + take)
const instituteExamsPast = (take) => instance.auth.get('/students/institutes/exams-past?take=' + take)
const listInstitute = () => instance.auth.get('/students/institutes')
const listProposalInstitute = (take) => instance.auth.get('/students/institutes/proposal?take=' + take)
const joinInstitute = (data) => instance.auth.post('/students/institutes/join', data)

const preferred = (take) => instance.auth.get('/students/preferreds?take' + take)
const preferredExamStore = (data) =>instance.auth.post('/students/preferreds', data)

const apiStudentPage = {
  preferred, 
  preferredExamStore,
  instituteExams,
  instituteExamsPast,
  listInstitute,
  listProposalInstitute,
  joinInstitute,
  notification,
  notificationRead,
  indexNews,
  showExams,
  showNews,
  examsLiveAll,
  examsLiveTake,
  storeExams,
  examsRecomendedAll,
  examsRecomendedTake,
  examsUpcomingAll,
  examsUpcomingTake,
  examsAttemptedAll,
  examsAttemptedTake,
  examsPrevious,
  examsGraph,
  examsGraphFilterDate,
  showExamsResult,
  storePractice,
  showPractice,
  practiceAll,
  practiceTake,
  practiceAttemptedAll,
  practiceAttemptedAll,
  practiceAttemptedTake,
  showPracticeResult,
  storeQuiz,
  showQuiz,
  showQuizResult,
  QuizAttemptedAll,
  QuizAll,
  QuizLiveAll,
}

export default apiStudentPage
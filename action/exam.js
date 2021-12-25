import instance from './instance'

const AllCategory = () => instance.noAuth.get('/exam-category')

const apiExam = {
  AllCategory
}

export default apiExam
import instance from './instance'

const all = () => instance.auth.get('/institute')

const apiInstitute = {
  all
}

export default apiInstitute

import axiosClient from './services'

const user = 'user/getUser'
const getAll = () => {
  return axiosClient.get(user)
}

export {
  getAll
}
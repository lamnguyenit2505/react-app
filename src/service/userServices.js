
import axiosClient from './services'

const userEnpoint = 'user'
const user = 'getUser'
const userEdit = 'edit'
const userDelete = 'delete'

const getAll = () => {
  return axiosClient.get(`${userEnpoint}/${user}`)
}
const getUserById = (id) => {
  return axiosClient.get(`${userEnpoint}/${userEdit}/${id}`)
}
const updateUser = (data) => {
  return axiosClient.post(`${userEnpoint}/${userEdit}`, data)
}
const deleteUser = (id) => {
  return axiosClient.get(`${userEnpoint}/${userDelete}/${id}`)
}
export {
  getAll,
  getUserById,
  updateUser,
  deleteUser
}
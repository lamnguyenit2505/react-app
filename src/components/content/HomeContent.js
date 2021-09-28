import { useEffect, useState } from "react"
import { getAll } from '../../service/userServices'

const HomeContent = (props) => {
  const [user, setUser] = useState([])
  useEffect(() => {
    getAll()
    .then((res) => {
      const { data: { data } } = res
      setUser(data)
    })
    .catch(err => err)
  }, [])
  return(
    <table className="table table-hover mt-5">
      <thead>
        <tr>
          <th> No. </th>
          <th> Name </th>
          <th> Role </th>
          <th> Action </th>
        </tr>
      </thead>
      <tbody>
        { user.map((item, index) => {
          return (
          <tr>
            <td>{item._id}</td>
            <td>{item.Name}</td>
            <td>{item.Roll}</td>
            <td>
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-danger">Delete</button>
              <button className="btn btn-info">View</button>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
  )
}
export default HomeContent
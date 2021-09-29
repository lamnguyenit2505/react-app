import { useEffect, useState } from "react"
import { getAll, getUserById, updateUser, deleteUser } from '../../service/userServices'
import InputText from "../common/InputText"

const HomeContent = (props) => {
  const [user, setUser] = useState([])
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    getAll()
    .then((res) => {
      const { data: { data } } = res
      setUser(data)
    })
    .catch(err => err)
  }, [])

  const vieuUser = (event) => {
    const id = event.target.attributes.getNamedItem('data-id').value
    getUserById(id)
    .then(res => {
      const { data } = res
      setUserInfo(data)
    })
  }

  const intinialData = {
    roll: '',
    name: ''
  }
  const [data, setData] = useState(intinialData)
  const onChangeValue = (name, value) => {
    setData({...data, [name]: value, id: userInfo._id})
  }
  const submitEdit = () => {
    updateUser(data)
    .then(res => {
      const  {data: {data}} = res
      const newUser =  user.map((item, index) => {
        
      })
      setUser(newUser)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const deleteX = (event) => {
    const id = event.target.attributes['data-id'].value
    deleteUser(id)
    .then(res => {
      const  {data: {data}} = res
      const newUser =  user.filter(item => item._id !== data._id)
      setUser(newUser)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return(
    <div className="container">
      <button className="btn btn-info mt-5">Add</button>
      <table className="table table-hover mt-5 text-center">
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
            <tr key = {index}>
              <td>{item._id}</td>
              <td>{item.Name}</td>
              <td>{item.Roll}</td>
              <td>
                <button className="btn btn-primary" data-id={item._id} data-toggle="modal" data-target="#modalEdit" onClick={vieuUser}>Edit</button>
                <button type="button" className="btn btn-danger" data-id={item._id} onClick={deleteX}>Delete</button>
                <button type="button" className="btn btn-info" data-id={item._id} data-toggle="modal" data-target="#modalView" onClick={vieuUser}>View</button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      <div className="modal fade" id="modalView" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">User Info</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5> ID: {userInfo._id} </h5>
              <h5> Name: {userInfo.Name} </h5>
              <h5> Roll: {userInfo.Roll} </h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">User Info</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <InputText
                  name="id"
                  id="id"
                  value={userInfo._id}
                  placeholder=""
                  readOnly={true}
                />
               <InputText
                  name="name"
                  id="name"
                  value={userInfo.Name}
                  placeholder="Name"
                  onChangeValue={onChangeValue}
                />
                <InputText
                  name="roll"
                  id="roll"
                  value={userInfo.Roll}
                  placeholder="Roll"
                  onChangeValue={onChangeValue}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={submitEdit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomeContent
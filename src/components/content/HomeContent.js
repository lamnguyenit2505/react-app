import { useEffect, useState } from "react"
import { getAll, getUserById, updateUser, deleteUser } from '../../service/userServices'
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';


const createSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  roll: Yup.number('Roll is require').max(3).required('Roll is require'),
});
const HomeContent = () => {
  const [user, setUser] = useState([])
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false)
  const [errors, setErr] = useState({
    name: '',
    roll: ''
  })
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: "",
    roll: ""
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setUserInfo({
        id: data._id,
        name: data.Name,
        roll: data.Roll
      })
      handleShow()
    })
  }
  const onChangeValue = (e) => {
    const { name, value } = e.target
    setUserInfo({...userInfo, [name]: value})
  }
  const submitEdit = (event) => {
    const a = event.target.attributes['data-submit'].value
    createSchema.validate(userInfo, { abortEarly: false })
    .then(() => {
      updateUser(userInfo)
      .then(res => {
        const  {data: {data}} = res 
        if(a === "add") {
          const newUser =  user.concat(data)
          setUser(newUser)
          setUserInfo({id: '', name:'', roll: ''})
          setErr({
            name: '',
            roll: ''
          })
          setShowAdd(false)
        } else {
          const newUser = user.map((item) => {
            return item._id === data._id ? data : item
          })
          setUser(newUser)
          setUserInfo({
            id: '',
            name: "",
            roll: ""
          })
          handleClose()
        }
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch((err) => {
      err.inner.forEach(error => {
        console.log(error.path + error.message)
        setErr({
          ...errors,
          [error.path]: error.message
        })
      });
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
      <button className="btn btn-info mt-5" onClick={() => setShowAdd(true)}>Add</button>
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
                <button className="btn btn-primary" data-id={item._id} onClick={vieuUser}>Edit</button>
                <button type="button" className="btn btn-danger" data-id={item._id} onClick={deleteX}>Delete</button>
                <button type="button" className="btn btn-info" data-id={item._id} data-toggle="modal" data-target="#modalView" onClick={vieuUser}>View</button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input className="form-control" name="id" value={userInfo.id} onChange={onChangeValue} readOnly />
            <input className="form-control" name="name" value={userInfo.name} onChange={onChangeValue} required/>
            <input className="form-control" name="roll" value={userInfo.roll}  onChange={onChangeValue} required />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" data-submit="edit" onClick={submitEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdd} onHide={ () => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input className="form-control" name="name" value={userInfo.name} onChange={onChangeValue} placeholder="Name" required/>
            <p className="text-danger">{errors ? errors.name : ''}</p>
            <input className="form-control" name="roll" value={userInfo.roll}  onChange={onChangeValue} placeholder="Roll" required />
            <p className="text-danger">{errors ? errors.roll : ''}</p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="primary" data-submit="add" onClick={submitEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default HomeContent
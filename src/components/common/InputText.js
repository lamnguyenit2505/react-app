import { useEffect, useState } from "react"

const InputText = (props) => {
  const [value, setValue] = useState(props.value)

  // useEffect(() => {
  //   setValue(props.value)
  // })

  const onChangeValue = (e) => {
    const { name, value } = e.target
    props.onChangeValue(name, value)
  }
  return(
    <div className="form-group">
      <input 
        type="text" 
        className="form-control" 
        id={props.id}
        name={props.name} 
        placeholder={props.placeholder}
        value={value}
        readOnly={props.readOnly}
        onChange={onChangeValue}
        onKeyUp={onChangeValue}
      />
    </div>
  )
}

export default InputText
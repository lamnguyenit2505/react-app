import { useState } from "react"

const InputText = (props) => {

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
        defaultValue={props.value} 
        readOnly={props.readOnly}
        onChange={onChangeValue}
      />
    </div>
  )
}

export default InputText
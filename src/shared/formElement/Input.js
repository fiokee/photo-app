import React, {useState} from 'react'
import './Input.css'

const Input = (props) => {

    const [enterValue, setEnterValue] = useState('');
    const [isValid, setIsValid] = useState(false);


    const changeHandler = (event)=>{
        event.target.value()
    }
    const element = props.element === 'input' ? ( 
    <input id={props.id} type={props.type} placeholder={props.placeholder} value={props.value} /> 
    ) : (
         <textarea id={props.id} rows={props.row || 3} value={props.value} />
    )
  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  )
}

export default Input

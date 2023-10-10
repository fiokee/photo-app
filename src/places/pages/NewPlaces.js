import React from 'react'
import Input from '../../shared/formElement/Input';
import './NewPlace.css';
import Button from '../../shared/formElement/Button/Button';


const NewPlaces = (props) => {
  const placeHandler = (event)=>{
    event.preventDefault();
  }
  return (
   <form className='place-form' onSubmit={placeHandler}>
    <Input element='input' type='text' label='Title' placeholder='Enter Title' />
    <Input type='text' label='Description' placeholder='Enter description'/>
    <Input element='input' type='text' label='Address' placeholder='Enter a valid Address'/>
     {/* <Input element='input' type='file' label='Add Image' /> */}
     <Button >ADD</Button>
   </form>
  )
}

export default NewPlaces

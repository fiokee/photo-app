import React, {useState, useContext, Fragment} from 'react'
import Input from '../../shared/formElement/Input';
import './NewPlace.css';
import Button from '../../shared/formElement/Button/Button';
import useHttpClient from '../../shared/http_hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const NewPlaces = (props) => {

  const defaultForm = {
    title: '',
    description: '',
    address: '',
    creator: ''

};
const auth = useContext(AuthContext);
const [formFields, setFormFields]=useState(defaultForm);
const {title, description, address, creator }= formFields;
const [isLogInMode, setIsLogInMode] = useState(true);

  const {isLoading, sendRequest, error, clearError} = useHttpClient();

  const handleInputChange = (event)=>{
    const {name, value}= event.target
    setFormFields({ ...formFields, [name]: value });
}
// console.log(formFields);

//for redirecting after creating a place
const history = useHistory()

  const placeHandler = async (event)=>{
    event.preventDefault();
try {
  await sendRequest(`http://localhost:5000/api/places`, 'POST',
    JSON.stringify({
      title:formFields.title,
      description: formFields.description,
      address: formFields.address,
      creator: auth.userId,
    }),
    {
      'Content-Type': 'application/json' //this tells the kind of data we are expecting
    }
    );
    //redirect users to another route
    history.push('/')
} catch (err) { 
}
    
}
  return (
    <Fragment>
      <ErrorModal error = {error} onClear={clearError}/>
      <form className='place-form' onSubmit={placeHandler}>
        {isLoading && <LoadingSpinner asOverLay/>}
        <input onChange={handleInputChange} value={title} element='input' type='text' label='Title' placeholder='Enter Title' name='title' />
        <input onChange={handleInputChange} value={description} type='text' label='Description' placeholder='Enter description' name='description'/>
        <input onChange={handleInputChange} value={address} element='input' type='text' label='Address' placeholder='Enter a valid Address' name='address'/>
        {/* <Input element='input' type='file' label='Add Image' /> */}
        <Button >ADD</Button>
      </form>
    </Fragment>
  )
}

export default NewPlaces

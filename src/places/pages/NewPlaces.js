import React, {useState, useContext, Fragment} from 'react'
import Input from '../../shared/formElement/Input';
import './NewPlace.css';
import Button from '../../shared/formElement/Button/Button';
import useHttpClient from '../../shared/http_hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ImageUpload from '../../shared/formElement/ImageUpload';


const NewPlaces = (props) => {

  const defaultForm = {
    title: '',
    description: '',
    address: '',
    image:'',
    creator: ''

};
const auth = useContext(AuthContext);
const [formFields, setFormFields]=useState(defaultForm);
const {title, description, address, creator }= formFields;
const [isLogInMode, setIsLogInMode] = useState(true);

  const {isLoading, sendRequest, error, clearError} = useHttpClient();

  const handleInputChange = (event, file)=>{
    const {name, value}= event.target;
    //checking and ensuring the image state is updated successfully
    if(name === 'image'){
      setFormFields({ ...formFields, image: file });
    }else{
      setFormFields({ ...formFields, [name]: value, image: file });
    }
}
// console.log(formFields);

//for redirecting after creating a place
const history = useHistory()

  const placeHandler = async (event)=>{
    event.preventDefault();
try {
  const formData = new FormData();
  formData.append('title', formFields.title);
  formData.append('description', formFields.description);
  formData.append('address', formFields.address);
  formData.append('image', formFields.image);
  formData.append('creator', auth.userId);

  await sendRequest(`http://localhost:5000/api/places`, 'POST', formData, {
    Authorization: 'Bearer ' + auth.token
  });
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

        <ImageUpload onChange={(event, file)=>handleInputChange(event, file)}
         center id="image" 
         errorText="please provide an image"
         />
        
        <Button >ADD PLACE</Button>
      </form>
    </Fragment>
  )
}

export default NewPlaces

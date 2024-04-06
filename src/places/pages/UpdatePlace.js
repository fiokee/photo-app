import React, { Fragment, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';
import useHttpClient from '../../shared/http_hook';
import Card from '../../shared/UiElement/Card/Card';


const UpdatePlace = () => {
  const defaultForm = {
    title: '',
    description: '',
};

  const [formFields, setFormFields]=useState(defaultForm);
  const {title, description }= formFields;
  const {isLoading, sendRequest, error, clearError} = useHttpClient();
  const [loadedData, setLoadedData] = useState(null);

  const handleInputChange = (event)=>{
    const {name, value}= event.target
    setFormFields({ ...formFields, [name]: value });
}
console.log(formFields);

  const placeId = useParams().placeId;
  useEffect(()=>{
    const fetchPlaceToUpdate = async ()=>{
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setLoadedData(responseData.place)
      } catch (err) {
       
      };
    };
    fetchPlaceToUpdate();
  },[sendRequest, placeId, setFormFields])
  

  const updatePlacehander = (event)=>{
    event.preventDefault();
  }
 
  
  
  if(isLoading){
    return(
      <div className='center'>
        <LoadingSpinner/>
      </div>
    );
  }

  if(!loadedData && !error){
    return( <div className="center">
      <Card>
      <h2>Place not Found</h2>
      </Card>
    </div>
    )
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <form onSubmit={updatePlacehander}>
      <input
      id='description'
       type='text'
        label='Description' 
        placeholder='Enter description'
        name='title'
        value={title}
        onChange={handleInputChange}
        />

      <input
      id='description'
       type='text'
        label='Description' 
        placeholder='Enter description'
        name='description'
        value={description}
        onChange={handleInputChange}
        />
        <Button type="submit" disabled={false}>Update Place</Button>
    </form>
    </Fragment>
  )
}

export default UpdatePlace
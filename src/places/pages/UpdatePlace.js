import React, { Fragment, useEffect, useState, useContext } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';
import useHttpClient from '../../shared/http_hook';
import Card from '../../shared/UiElement/Card/Card';
import { AuthContext } from '../../shared/context/auth-context';


const UpdatePlace = () => {
  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
  });

  const auth = useContext(AuthContext);
  const {isLoading, sendRequest, error, clearError} = useHttpClient();
  const [loadedData, setLoadedData] = useState(null);
  const history = useHistory(); //to redirect
  const placeId = useParams().placeId;

  useEffect(()=>{
    const fetchPlaceToUpdate = async ()=>{
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setLoadedData(responseData.place);
        setFormFields({   // Set the initial state with loaded data
          title: responseData.place.title,
          description: responseData.place.description,
        });
      } catch (err) {
       
      };
    };
    fetchPlaceToUpdate();
  },[sendRequest, placeId, setFormFields])

  const handleInputChange = (event)=>{
    const {name, value}= event.target
    setFormFields({ ...formFields, [name]: value });
}
// console.log(formFields);
  
//this is where we can update the data and store it back
  const updatePlacehandler = async (event)=>{
    event.preventDefault();

    try {
    await sendRequest(`http://localhost:5000/api/places/${placeId}`, 'PATCH',
    JSON.stringify({
      title:formFields.title,
      description: formFields.description,
    }),
    {
      'Content-Type': 'application/json' //this tells the kind of data we are expecting
    });
    history.push('/' + auth.userId + '/places') //to redirect to the places route after a successfull update
    } catch (error) {
      
    }
  };
 

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
      {!isLoading && loadedData && (
    <form onSubmit={updatePlacehandler}>
      <input
      id='title'
       type='text'
        label='Title' 
        placeholder='Enter title'
        name='title'
        value={formFields.title}
        onChange={handleInputChange}
        />

      <input
      id='description'
       type='text'
        label='Description' 
        placeholder='Enter description'
        name='description'
        value={formFields.description}
        onChange={handleInputChange}
        />
        <Button type="submit" disabled={false}>Update Place</Button>
    </form>
    )}
    </Fragment>
  )
}

export default UpdatePlace
import React, { Fragment, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { PlaceList } from '../components/PlaceList';
import useHttpClient from '../../shared/http_hook';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';


const UserPlaces = () => {
  const {isLoading, sendRequest, error, clearError}= useHttpClient();
  const [loadedePlaces, setLoadedPlaces] = useState(null);

  //filtering place base on user id
  const userId = useParams().userId;

  useEffect(()=>{
    const fetchUserPlaces = async()=>{
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places)
      } catch (err) {
        console.error('Error fetching user places:', err);
      }
    };

    fetchUserPlaces();
  },[sendRequest, userId])
  // console.log(loadedePlaces)


  //filtering out places that was deleted and reloading the UI
   const deletedHandler =(deletedPlaceId)=>{
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
   }
  return(
  <Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <LoadingSpinner asOverlay/>}
    {!isLoading && loadedePlaces && <PlaceList items={loadedePlaces} onDeletePlace={deletedHandler}/>}
  </Fragment>
  );
};

export default UserPlaces

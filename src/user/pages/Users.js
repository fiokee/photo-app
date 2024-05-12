import React, { Fragment, useEffect, useState } from 'react'
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import useHttpClient from '../../shared/http_hook';

const Users = () => {
  const {isLoading, sendRequest, error, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(()=>{
    const fetchUsers = async ()=>{
      try {
      const responseData = await sendRequest(`http://localhost:5000/api/users`);
      
      setLoadedUsers(responseData.users);
     
      } catch (err) {
      }
  
    };
    
    fetchUsers();
  },[sendRequest])
    
  // console.log(loadedUsers)
  return (
    <div>
      <ErrorModal error ={error} onClear={clearError}/>
      {isLoading && (
      <div className='center'>
        <LoadingSpinner/>
        </div>)}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
    </div>
  )
}

export default Users

import React, { Fragment } from 'react'
import UsersItem from './UsersItem';
import Card from '../../shared/UiElement/Card/Card';
import './UsersList.css';
import AllPlaces from '../../places/pages/AllPlaces';


const UsersList = (props) => {
    //check to see if user exist or not
    if(props.items.length ===0){
      return( <div className='center'>
        <Card>
        <h2>No user found</h2>
        </Card>
      </div> 
      ); 
    }

    return <Fragment>
      <ul className='users-list'>
        {props.items.map((user)=>(
            <UsersItem
             key={user.id} 
             id={user.id} 
             image={user.image} 
             name={user.name}
             placeCount={user.places.length}
             /> 
        ))}
    </ul>
    
    </Fragment> 
  
}

export default UsersList

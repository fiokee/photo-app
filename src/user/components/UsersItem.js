import React from 'react'
import './UserItem.css'
import {Link} from 'react-router-dom'
import Avatar from '../../shared/UiElement/Avatar/Avatar'
import Card from '../../shared/UiElement/Card/Card'


const UsersItem = (props) => {
  return (
  
      <li className='user-item'>
        <Card  className='user-item__content'>
        <Link to={`/${props.id}/places`}>
          <div className='user-item__image'>
            <Avatar image={`https://app-backend-hop1.onrender.com/${props.image}`} alt={props.name}/>
          </div>
          <div className='user-item__info'>
            <h2>{props.name}</h2>
            <h3>{props.placeCount} {props.placeCount ===2 ? 'places' : 'place'}</h3>
          </div>
        </Link>
        </Card>
      </li>
    
  )
}

export default UsersItem

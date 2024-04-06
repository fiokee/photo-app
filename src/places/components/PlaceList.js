import React from 'react';
import './PlaceList.css';
import Card from '../../shared/UiElement/Card/Card';
import PlaceItem from './PlaceItem';
import { Link} from 'react-router-dom';


export const PlaceList = props => {
    if(props.items.length === 0){
        return <div className='place-list center'>
            <Card>
                <h2>No Place Found</h2> 
                <button>
                  <Link  to="/Newplaces">Share Place</Link>
                </button>
            </Card>
        </div>
    }
  return <ul className='place-list'>
    {props.items.map((place)=>(
        <PlaceItem
         key={place.id}
         id={place.id}
         title={place.title}
         description={place.description}
         image={place.image}
         address={place.address}
         creatorId={place.creator}
         coordinate={place.location}
         onDelete = {props.onDeletePlace}
         />
    ))}
  </ul>
    
}

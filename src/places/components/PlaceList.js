import React from 'react';
import './PlaceList.css';
import Card from '../../shared/UiElement/Card/Card';
import PlaceItem from './PlaceItem';


export const PlaceList = props => {
    if(props.items.length === 0){
        return <div className='place-list center'>
            <Card>
                <h2>No Place Found</h2>
                <button>Share Place</button>
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
         image={place.imageUrl}
         address={place.address}
         creatorId={place.creator}
         coordinate={place.location}
         />
    ))}
  </ul>
    
}

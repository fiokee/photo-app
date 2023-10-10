import React from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];


const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifyPlace = DUMMY_PLACES.find(p=> p.id === placeId);

  if(!identifyPlace === placeId){
    return <div className="center">
      <h2>Place not Found</h2>
    </div>
  }
  return (
    <form>
      <Input
      id='description'
       type='text'
        label='Description' 
        placeholder='Enter description'
        value={identifyPlace.description}
        />
        <Button type="submit" disabled={false}>Update Place</Button>
    </form>
  )
}

export default UpdatePlace
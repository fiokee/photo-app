import React, {Fragment, useState} from 'react'
import './PlaceItem.css';
import Card from '../../shared/UiElement/Card/Card';
import Button from '../../shared/formElement/Button/Button';
import Modal from '../../shared/UiElement/Modal/Modal';

const PlaceItem = (props) => {
  const [showMap, setShowMap]= useState(false);

  const showMapHandler = ()=> setShowMap(true);

  const closeMapHandler = ()=> setShowMap(false);

  return (
    <Fragment>
      <Modal
       show={showMap}
        onCancel={closeMapHandler} 
        header={props.title} 
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
        >
          <div className='map-container'>
            <h2>{props.address}</h2>
          </div>
        </Modal>

    <li className='place-item'>
      <Card className='place-item__content'>
      <div className='place-item__image'>
        <img src={props.image} alt={props.title}/>
      </div>
      <div className='place-item__info'>
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.description}</p>
      </div>
      <div className='place-item__actions'>
        <Button inverse onClick={showMapHandler}>VIEW ON MAP</Button>
        <Button to={`/places/${props.id}`}>EDIT</Button>
        <Button danger>DELETE</Button>
      </div>
      </Card>
    </li>
    </Fragment>
  )
}

export default PlaceItem

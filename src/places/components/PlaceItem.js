import React, {Fragment, useState} from 'react'
import './PlaceItem.css';
import Card from '../../shared/UiElement/Card/Card';
import Button from '../../shared/formElement/Button/Button';
import Modal from '../../shared/UiElement/Modal/Modal';

const PlaceItem = (props) => {
  const [showMap, setShowMap]= useState(false);
  const [showConfirmModal, setShowConfirmModal]=useState(false);

  const showMapHandler = ()=> setShowMap(true);

  const closeMapHandler = ()=> setShowMap(false);

  //show delete warning
  const showDeleteWarning = ()=>{
    setShowConfirmModal(true);
  };
  // confirm delete handler
  const confirmDeleteHandler =()=>{
    setShowConfirmModal(false);
    console.log("Deleting...")
  }
  //cancel delete handler
  const cancelHandler =()=>{
    setShowConfirmModal(false);
  }

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

{/*show confirm delete handler*/}
        <Modal
        show={showConfirmModal}
        onCancel={cancelHandler} 
        header="Are you sure?" 
        footerClass="place-item__modal-actions" 
        footer={
          <React.Fragment>
            <Button onClick={cancelHandler} inverse>Cancel</Button>
            <Button onClick={confirmDeleteHandler} danger>Delete</Button>
          </React.Fragment>
        }>
          <p>Do you want to delete this place? it's can't be undone there after</p>
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
        <Button danger onClick={showDeleteWarning}>DELETE</Button>
      </div>
      </Card>
    </li>
    </Fragment>
  )
}

export default PlaceItem

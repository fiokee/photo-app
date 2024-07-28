import React, {Fragment, useContext, useState, useEffect} from 'react';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import './PlaceItem.css';
import Card from '../../shared/UiElement/Card/Card';
import Button from '../../shared/formElement/Button/Button';
import Modal from '../../shared/UiElement/Modal/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import useHttpClient from '../../shared/http_hook';
import UsersItem from '../../user/components/UsersItem';
import PlaceMap from '../../shared/UiElement/Map/AllMap'

const PlaceItem = (props) => {
  const [showMap, setShowMap]= useState(false);
  const [showConfirmModal, setShowConfirmModal]=useState(false);
  const {isLoading, sendRequest, error, clearError} = useHttpClient();

  const showMapHandler = ()=> setShowMap(true);
  const closeMapHandler = ()=> setShowMap(false);
 
  // const UserProfile = () => {
  //   const [profileData, setProfileData] = useState(null);
  
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const profile = await UsersItem();
  //       setProfileData(profile);
  //     };
      
  //     fetchData();
  //   }, []);
  // }
    
  //show delete warning modal
  const showDeleteWarning = ()=>{
    setShowConfirmModal(true);
  };
  // confirm delete handler
  const confirmDeleteHandler = async ()=>{
    setShowConfirmModal(false);
    try {
      await sendRequest(`https://app-backend-hop1.onrender.com/api/places/${props.id}`, 'DELETE', null, {
        Authorization: 'Bearer ' + auth.token
      })
      props.onDelete(props.id) //refreshing the page after deleting
    } catch (error) {
      
    }
  }
  //cancel delete handler
  const cancelHandler =()=>{
    setShowConfirmModal(false);
  };

  const auth = useContext(AuthContext);

  return (
    <Fragment>
      <ErrorModal error={error} onClear ={clearError}/>
      <Modal
       show={showMap}
        onCancel={closeMapHandler} 
        header={props.title} 
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
        >
          <div className='map-container'>
            {/* <h2>{props.address}</h2> */}
            <PlaceMap/>
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
        
    <div className='container'>
      
    <li className='place-item'>
      <Card className='place-item__content'>
        {isLoading && <LoadingSpinner asOverlay/>}
        
      <div className='place-item__image'>
        <img src={`https://app-backend-hop1.onrender.com/${props.image}`} alt={props.title}/>
      </div>
      <div className='place-item__info'>
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.description}</p>
      </div>
      <div className='place-item__actions'>
        <Button inverse onClick={showMapHandler}>VIEW ON MAP</Button>
        {auth.userId === props.creatorId && (
          <React.Fragment>

            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeleteWarning}>DELETE</Button>
          </React.Fragment>
        )}
      </div>
      </Card>
    </li>
    </div>
    </Fragment>
  )
}

export default PlaceItem

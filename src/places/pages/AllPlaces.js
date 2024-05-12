import React, {useState, useEffect} from 'react'
import './AllPlaces.css';
import Card from '../../shared/UiElement/Card/Card';
import Button from '../../shared/formElement/Button/Button';
import Avatar from '../../shared/UiElement/Avatar/Avatar';
import profile from '../../assets/avataaars (2).png';
import placeImage from '../../assets/mount fuji.jpg';
import useHttpClient from '../../shared/http_hook';
import UsersList from '../../user/components/UsersList';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';


const AllPlaces = (props) => {
const {isLoading, sendRequest, error, clearError} = useHttpClient();    
const [userData, setUserData] = useState(null);
const [placeData, setPlaceData] = useState(null);

useEffect(()=>{
    const fetchUsersData = async ()=>{
        try {
            const responseData = await sendRequest(`http://localhost:5000/api/users`)
            setUserData(responseData.users)
        } catch (error) {
            
        }
    };
    fetchUsersData();
},[sendRequest, setUserData]);

useEffect(() => {
  if(userData){

  userData.map((user)=>{
    // console.log(user.name) // Log the updated userData
  })
}
}, [userData]);


return (
  <div>
    {isLoading && <LoadingSpinner asOverlay/>}
    <Card>
      <h1>All-Places</h1>
      {userData && (
        <ul className="place-list">
          {userData.map((user) => (
            <li key={user.id} className="place-item">
              <Card className="place-item__content">
                <div className="user-item__image">
                  <Avatar image={`http://localhost:5000/${user.image}`} alt="" />
                </div>
                <div className="user-item__info">
                  <h2>{user.name}</h2> {/* Display user's name here */}
                  <h3>{user.places.length} Places</h3>
                </div>

                <div className="place-item__image">
                  <img src={placeImage} alt="" />
                </div>
                <div className="place-item__info">
                  <h2>Mount Fuji</h2>
                  <h3>China Town</h3>
                  <p>Located in China</p>
                </div>
                <div className="place-item__actions">
                  <Button inverse>VIEW ON MAP</Button>
                  {/* Display edit and delete buttons based on user authentication */}
                  {/* {auth.userId === props.creatorId && ( */}
                  <React.Fragment>
                    <Button>EDIT</Button>
                    <Button danger>DELETE</Button>
                  </React.Fragment>
                  {/* )} */}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Card>
  </div>
);
}

export default AllPlaces
import React, { useState, useEffect } from 'react';
import './AllPlaces.css';
import Card from '../../shared/UiElement/Card/Card';
import Button from '../../shared/formElement/Button/Button';
import Avatar from '../../shared/UiElement/Avatar/Avatar';
import useHttpClient from '../../shared/http_hook';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import Map from '../../shared/UiElement/Map/AllMap'

const AllPlaces = (props) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [userData, setUserData] = useState([]);
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const responseData = await sendRequest('https://app-backend-hop1.onrender.com/api/users');
        const sortedUserData = responseData.users.slice().sort((a, b) => JSON.stringify(b).localeCompare(JSON.stringify(a)));
        setUserData(sortedUserData);
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };

    const fetchPlacesData = async () => {
      try {
        const responsePlaceData = await sendRequest('https://app-backend-hop1.onrender.com/api/places');
        const sortedPlaceData = responsePlaceData.places.slice().sort((a, b) => JSON.stringify(b).localeCompare(JSON.stringify(a)));
        setPlaceData(sortedPlaceData);
      } catch (error) {
        console.error('Fetching places failed:', error);
      }
    };

    fetchUsersData();
    fetchPlacesData();
  }, [sendRequest]);

  const getUserById = (userId) => {
    return userData.find(user => user.id === userId);
  };

  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <p>{error}</p>}
      <Card>
        <h1>All Places</h1>
        {placeData.length > 0 && (
          <ul className="place-list">
            {placeData.map((place) => {
              const user = getUserById(place.creator);
              return (
                <div className='container'>
                <li key={place.id} className="place-item">
                  <Card className="place-item__content">
                    {user && (
                      <div className="user-item__image">
                        <Avatar image={`https://app-backend-hop1.onrender.com/${user.image}`} alt={user.name} />
                      </div>
                    )}
                    {user && (
                      <div className="user-item__info">
                        <h2>{user.name}</h2>
                      </div>
                    )}
                    <div className="place-item__image">
                      <img src={`https://app-backend-hop1.onrender.com/${place.image}`} alt={place.title} />
                    </div>
                    <div className="place-item__info">
                      <h2>{place.title}</h2>
                      <h3>{place.address}</h3>
                      <p>{place.description}</p>
                    </div>
                    <div className="place-item__actions">
                      <Button inverse>VIEW ON MAP</Button>
                      {props.auth && props.auth.userId === place.creator && (
                        <React.Fragment>
                          <Button to={`/places/${place.id}`}>EDIT</Button>
                          <Button danger>DELETE</Button>
                        </React.Fragment>
                      )}
                    </div>
                    <Map/>
                  </Card>
                </li>
                </div>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default AllPlaces;

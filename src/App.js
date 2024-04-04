import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/UiElement/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {

const [isLogedIn, setIsLogedIn] = useState(false);
const [userId, setUserId] = useState(false);

const login = useCallback((uid)=>{
  setIsLogedIn(true)
  setUserId(uid);
}, []);

const logout = useCallback(()=>{
  setIsLogedIn(false)
}, [])

//checking for redirect to another routes if the user logsin
let routes;
if(isLogedIn){
  routes = (
    <React.Fragment>
      
    <Route path="/" exact>
    <Users/>
  </Route>

      <Route path="/:userId/places" exact>
        <UserPlaces/>
      </Route>
      <Route path="/Newplaces" exact>
        <NewPlaces/>
      </Route>

      <Route path="/places/:placeId">
        <UpdatePlace/>
      </Route>
      <Redirect to="/"/>
    </React.Fragment>
  );
}else{
  routes = (
    <React.Fragment>
      
    <Route path="/" exact>
    <Users/>
  </Route>

      <Route path="/:userId/places" exact>
        <UserPlaces/>
      </Route>

      <Route path="/auth">
        <Auth/>
      </Route>
      <Redirect to="/auth"/>
    </React.Fragment>
  )
}
  return (
    <AuthContext.Provider value={{isLogedIn: isLogedIn, userId, login: login, logout: logout}}>
    <Router>
      <MainNavigation/>
      <main>
      <Switch>
      {routes}
      </Switch>
      </main>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;

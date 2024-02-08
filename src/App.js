import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/UiElement/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {

  return (
    <AuthContext.Provider>
    <Router>
      <MainNavigation/>
      <main>
      <Switch>
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
      
      <Route path="/auth">
        <Auth/>
      </Route>

      <Redirect to="/"/>
      </Switch>
      </main>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;

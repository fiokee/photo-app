import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/UiElement/Navigation/MainNavigation';
function App() {

  return (
    <Router>
      <MainNavigation/>
      <main>
      <Switch>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/Newplaces" exact>
        <NewPlaces/>
      </Route>
      <Redirect to="/"/>
      </Switch>
      </main>
    </Router>
  );
}

export default App;

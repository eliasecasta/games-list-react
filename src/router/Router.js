import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import Favourites from '../views/Favourites';
import GameInfo from '../views/Game-info';
import Login from '../views/Login';
import NavBar from '../components/NavBar';

const Router = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      {/* This is a failsafe route */}
      <Route exact path="/" component={Home} />

      <Route exact path="/home" component={Home} />
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/game-info" component={GameInfo} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;

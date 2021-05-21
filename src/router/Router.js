import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import Meals from '../views/Meals';
import Recipes from '../views/Recipes';
import NavBar from '../components/NavBar';

const Router = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      {/* This is a failsafe route */}
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/meals" component={Meals} />
      <Route exact path="/recipe" component={Recipes} />
    </Switch>
  </BrowserRouter>
);

export default Router;

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Landing from "./components/layout/landing";
import store from './store';

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { logoutUser } from "./actions/authActions";
import { SET_USER } from "./actions/types";

import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";

if(localStorage.jwtToken) {
  //decode 
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //Expired
    //Logout user
    store.dispatch(logoutUser());
    //Redirect user to login
    window.location.href = '/login';
  }

  //Set auth header
  setAuthToken(localStorage.jwtToken);
  //dispatch
  store.dispatch({
    type: SET_USER,
    payload: decoded
  });

}

 class App extends Component {
   render() {
     return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
        <Route exact path="/" component={Landing}/>
        <Route exact path="/register"  component={Register}/>
        <Route exact path="/login" component={Login}/>
    </BrowserRouter>
    </Provider>
     )
   }
  };

export default App;

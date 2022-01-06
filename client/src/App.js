import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store';

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profiles from "./components/profiles/Profiles";
import Profile from './components/profile/Profile';
import Landing from "./components/layout/landing";
import Dashboard from "./components/dashboard/Dashboard";
import Posts from "./components/Posts/Posts";
import PostItem from "./components/Posts/postItem/PostItem";
// import Post from "./components/Posts/postItem/Post";
import CreateProfile from "./components/create-profile/CreateProfile";
import { logoutUser } from "./actions/authActions";
import { SET_USER } from "./actions/types";
import PrivateRoute from "./components/common/PrivateRoute";

import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import Form from "./components/Form/form";

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
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle"component={Profile}  />
        {/* <Switch>
         <PrivateRoute exact path="/profile/"component={Profile} />
       </Switch> */}
        <Switch>
         <PrivateRoute exact path="/dashboard" component={Dashboard} />
       </Switch>

       <Switch>
        <PrivateRoute exact path="/create-profile" 
        component={CreateProfile}
        />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/feed" component={Posts} />
      </Switch>
          {/* <Switch>
              <PrivateRoute exact path="/posts/:id" component={Post} />
          </Switch> */}
    </BrowserRouter>
    </Provider>
     )
   }
  };

export default App;

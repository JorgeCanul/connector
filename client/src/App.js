import React, { Component } from "react";
import { Provider } from "react-redux";
import Landing from "./components/layout/landing";
import store from './store';




 class App extends Component {
   render() {
     return (
    <Provider store={store}>
      <Landing />
    </Provider>
     )
   }
  };

export default App;

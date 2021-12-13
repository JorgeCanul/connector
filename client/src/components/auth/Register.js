import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from  'classnames';


 class Register extends Component {
   constructor() {
     super();
     this.state = {
       name: '',
       email: '',
       password: '',
       password2: '',
       errors: {}
     }
   }
  render() {
    return (
      <div>
        
      </div>
    )
  }
};

export default Register;

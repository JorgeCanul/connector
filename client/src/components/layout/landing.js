import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

 class Landing extends Component {
   
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
   render() {
    return (
      <div className='landing'>
        <div className='landing-inner'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 success text-center'>
                <h1 className='display-4 mb-4 text-center text-white'>Connector</h1>
                <p className='laed text-white'>Create Your Profile, Share Posts and Get to Know Others</p>
                <hr/>
                <Link to="/register" className='btn btn-lg btn-info mr-2'>Sign Up</Link>
                <Link to="/login" className='btn btn-lg btn-light'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
   }
};

const mapToStateProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapToStateProps, {})(Landing);

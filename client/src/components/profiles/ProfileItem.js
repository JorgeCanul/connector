import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


 class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div  className="card card-body bg-light mb-3">
        <div className='row '>
          <div className='col-2 pb-2'>
            <img src={profile.user.avatar} alt={profile.user.name}
            className='rounded-circle ' />
          </div>
          <div className="col-lg-12 col-md-6 col-sm-6">
            <h3>{profile.user.name}</h3>
            <Link to={`/profile/${profile.handle}`} type='button' className="btn btn-info btn-sm">
              See Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}



export default ProfileItem;
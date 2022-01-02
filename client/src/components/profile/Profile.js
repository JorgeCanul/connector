import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import Form from '../Form/form';
import PostItem from '../Posts/postItem/PostItem';
import Spinner from '../common/Spinner';
import {  getCurrentProfile, getProfileByHandle } from '../../actions/profileActions';
import { getPostsById } from '../../actions/postsActions';
class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
    if(this.props.match.params.id) {
      this.props.getPostsById(this.props.match.params.id);
    }
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { auth } = this.props;
    const { posts } = this.props.posts;
    // console.log(post)
    // if(posts.length < 0 || loading) {
    //   console.log('Working on it')
    // } else {
    //   console.log(posts);
    // }
    let indiviPosts;

    if(profile !== null) {

      /////// THIS IS WHAT I NEED!!!! ???? TO SHOW INDIVIDUALS POSTS.
      // console.log(profile.user._id)
      
      if(profile.user._id) {
        indiviPosts = profile.user._id
      }
    }

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {auth.user.id === profile.user._id? <Form /> : null}
          <PostItem posts={posts}/>
          {indiviPosts}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  getPostsById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileByHandle, getPostsById })(Profile);
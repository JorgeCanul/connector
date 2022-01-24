import React, { Component } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import Spinner from '../../common/Spinner';
import { getCurrentProfile } from '../../../actions/profileActions';
import { getPostsById } from '../../../actions/postsActions';
// import IndivPostsItem from './IndivPostsItem';


class IndivPosts extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    }
  }
  // componentDidMount() {
  //     console.log(this.props);
  //   // }
  //     // this.props.getPostsById(this.props.profile.user._id);
  //     // console.log(this.props.profile.user._id)
  // }

  componentDidMount() {
    if(this.props.errors) {
      this.setState({errors: this.props.errors})
    }
    
    let { posts, ...profile} = this.props;
    console.log(profile)
    // posts.indiPosts.map(el => console.log(el.user._id))
    console.log(posts)
    // if(profile.profile.profile.user._id === )
    this.props.getPostsById(profile.profile.profile.user._id);
    // console.log(profile.user._id)
    // if(this.profile.match)/
    //   if(Object.entries(posts.indiPosts).length > 0 ) {
    //     posts.indiPosts.map(el => {
    //         console.log(el)
    //         // this.props.getPostsById(el.user.match.params.id);
    //     })
    //   }
  }
 
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.errors) {
  //     this.setState({errors: nextProps.errors})
  //   }
  // }

   render() {
     const {  loading, indiPosts } = this.props.posts
    const { errors } = this.state;
    
    if(errors) {
      console.log(errors)
    }

     let individualsPosts;
     
     if(indiPosts === undefined || loading) {
      individualsPosts = <Spinner />
     } 
     if(Object.entries(indiPosts).length > 0 || Object.entries(errors).length < 0){
      
      // individualsPosts = indiPosts.map(posts => <IndivPostsItem key={posts._id} posts={posts}/>)
     } else {
      individualsPosts = <h1>No posts!</h1>
    }
    
     return (
       <div>{individualsPosts}</div>
     )
   }
};

IndivPosts.propTypes = {
  getPostsById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.errors,
  profile: state.profile
});

      
export default connect(mapStateToProps, {getCurrentProfile, getPostsById})(IndivPosts)
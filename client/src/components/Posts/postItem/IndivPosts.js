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
import PostItem from './PostItem';


class IndivPosts extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props,
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // } 

    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }


  componentDidMount() {
    if(this.props.profile === undefined || this.state.loading === true) {
        console.log('Working on it!')
    } 

    if(this.props.profile.user._id || !this.state.loading) {
        this.props.getPostsById(this.props.profile.user._id);
        console.log('Done');
    }
  
  }

  
   render() {
     let { posts, loading } = this.props.posts
     const { errors } = this.props;
    //  console.log(typeof posts)
    //  if(!Object.entries(posts)) {
    //    console.log(errors);
    //  }
    console.log(errors.noposts);

     let individualsPosts;
     if(posts === null || loading) {
      individualsPosts = <Spinner />
     } else {
       if(Object.keys(posts).length > 0) {
        console.log(posts)
        individualsPosts = posts.map(posts => <PostItem key={posts._id}  posts={posts}/>)
       }
       else if (errors){
        individualsPosts = <h1>No posts</h1>
      }
     }
     

     return (
       <div>{individualsPosts}</div>
     )
   }
};

IndivPosts.propTypes = {
  getPostsById: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.errors
});

      
export default connect(mapStateToProps, { getPostsById})(IndivPosts)
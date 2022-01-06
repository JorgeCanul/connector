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
      id: undefined,
      loading: this.props
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
     const { posts, loading } = this.props.posts
     let individualsPosts;
     if(posts === undefined || loading) {
      individualsPosts = <Spinner />
     } else {
      console.log(posts)
      individualsPosts = posts.map(posts => <PostItem posts={posts}/>)
     }

     return (
       <div>{individualsPosts}</div>
     )
   }
};

IndivPosts.propTypes = {
  getPostsById: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
});

      
export default connect(mapStateToProps, { getPostsById})(IndivPosts)
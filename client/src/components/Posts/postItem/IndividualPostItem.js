import React, { Component } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import Spinner from '../../common/Spinner';
import { deletePost } from '../../../actions/postsActions';

class IndividualPostsItem extends Component {
  constructor() {
    super();
  }

  onClickDelete(id) {
    console.log('I got clicked');
    this.props.deletePost(id);
  }

  render() {
    
    const { posts, loading } = this.props;
    const { profile } = this.props.profile;
    const { errors } = this.props;
    const { auth } = this.props;

    if(errors) {
      console.log(errors)
    }
    // console.log(auth);
    // console.log(posts)
    let post;
    const classes = {
      media: {
      height: 0,
      paddingTop: '56.25%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundBlendMode: 'darken',
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
    },
    overlay2: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: 'white',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    }}
    
    if(posts === null || !Object.entries(posts) || loading || posts.length < 0) {
      post = <Spinner />
    } else {
      post =
      <Card key={posts._id} style={classes.card}>
        <CardMedia style={classes.media} image={posts.selectedFile} title={posts.title}/>
        <div style={classes.overlay}>
          {/* ///////////////// check? to={`/posts/${el._id}`}*/}
          <Typography variant="h6">{posts.creator}</Typography>
          <Typography variant="body2">{moment(posts.createdAt).format()}</Typography>
        </div>
        <div style={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={() => {}}>
            <MoreHorizIcon fontSize="medium"/>
          </Button>
        </div>
        <div style={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {`#${posts.tags.map(tag => tag)}`}
        </Typography>
        </div>
        <CardContent>
           <Typography style={classes.title} variant="h5" color="textSecondary" gutterBottom>{posts.message}</Typography>
        </CardContent>
        <CardActions style={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => {}}>
            <ThumbUpAltIcon fontSize="small"/>
            Like {posts.likeCount}
          </Button>
          {auth.user.id === profile.user._id? <Button  size="small" color="primary" onClick={() => this.onClickDelete(posts._id)}>
            <DeleteIcon fontSize="small"/>
            Delete
          </Button> : null}
        </CardActions>
      </Card>
  }
  
  return (
    <div>{post}</div>
   )
 
  }
};

IndividualPostsItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapToStateProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapToStateProps, {deletePost})(IndividualPostsItem);
  
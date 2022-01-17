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
import ProfileItem from '../../profiles/ProfileItem';
 class PostItem extends Component {
  
  onClick(id) {
    console.log(id);
  }

  render() {
    const { posts, loading, profiles } = this.props;
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
      top: '10px',
      Left: '0.10rem',
      color: '#98dce5',

    },
    overlay2: {
      position: 'absolute',
      top: '10px',
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
    
    if(posts === null || loading) {

      post = <Spinner />
    } else {
      console.log(posts)
      post =
      <Card onClick={this.onClick.bind(this, posts.user._id)} className="mt-3" key={posts._id} style={classes.card}>
        <CardMedia style={classes.media} image={posts.selectedFile} title={posts.title}/>
        <div style={classes.overlay} className='col-xs-3 col-sm-1 col-lg-3'>
        <img style={ {maxHeight: '50px', maxWidth: '50px', backgroundColor: '#98dce5'}} className="rounded-circle img-thumbnail"
              src={posts.user.avatar}
              alt={posts.user.name}/>
          <Typography variant="h6">{posts.user.name}</Typography>
          <Typography variant="body2">{moment(posts.creatorAt).fromNow()}</Typography>
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
          {/* <Button size="small" color="primary" onClick={() => {}}>
            <DeleteIcon fontSize="small"/>
            Delete
          </Button> */}
        </CardActions>
      </Card>
  }
  
  return (
    <div>{post}</div>
   )
 
  }
};


export default PostItem;
  
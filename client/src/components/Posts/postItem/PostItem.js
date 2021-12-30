import React, { Component } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import Spinner from '../../common/Spinner';
import ProfileItem from '../../profiles/ProfileItem';


class PostItem extends Component {

  render() {
    const { posts } = this.props;
    const { profiles } = this.props
    console.log(profiles)
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
    
    if(posts === null || !Object.keys(posts)) {
      post = <Spinner />
    } else {
  
      posts.map(el => console.log(el));
      //  profiles.map(el => console.log());

      post = posts.map((el, index) => 
      <Card key={el._id} style={classes.card}>
        <CardMedia style={classes.media} image={el.selectedFile} title={el.title}/>
        <div style={classes.overlay}>
          <Typography variant="h6">{el.user.name}</Typography>
          <Typography variant="body2">{moment(el.createdAt).format()}</Typography>
        </div>
        <div style={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={() => {}}>
            <MoreHorizIcon fontSize="medium"/>
          </Button>
        </div>
        <div style={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {`#${el.tags.map(tag => tag)}`}
        </Typography>
        </div>
        <CardContent>
           <Typography style={classes.title} variant="h5" color="textSecondary" gutterBottom>{el.message}</Typography>
        </CardContent>
        <CardActions style={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => {}}>
            <ThumbUpAltIcon fontSize="small"/>
            Like {el.likeCount}
          </Button>
          <Button size="small" color="primary" onClick={() => {}}>
            <DeleteIcon fontSize="small"/>
            Delete
          </Button>
        </CardActions>
      </Card>
      );
  }
  
  return (
    <div>{post}</div>
   )
 
  }
};


export default PostItem
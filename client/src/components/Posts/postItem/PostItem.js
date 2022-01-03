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

  render() {
    // const { id } = this.props
    // console.log(id)
    const { posts, loading } = this.props;
    const { profile } = this.props;
    // console.log(profile)
    // console.log(profiles)
    console.log(posts)
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
    let n;
    
    if(posts === null || !Object.entries(posts) || loading || posts.length < 0) {
      post = <Spinner />
    } else {
      // if(posts === null || loading || !Object.keys(posts)) {

      //   console.log('Working on it!');
      // } else {
      //   posts.map(el1 => console.log(el1.user.name))

      // }
      post = posts.map((el, index) => 
      // <Link to={`/profile/${profile.handle}`}>
      <Card key={el._id} style={classes.card}>
        <CardMedia style={classes.media} image={el.selectedFile} title={el.title}/>
        <div style={classes.overlay}>
          {/* ///////////////// check? to={`/posts/${el._id}`}*/}
          <Typography variant="h6">{el.creator}</Typography>
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
      // </Link>
      );
  }
  
  return (
    <div>{post}</div>
   )
 
  }
};
PostItem.propTypes = {
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

// const mapStateToProps = (state) => ({

// })

export default PostItem;
  
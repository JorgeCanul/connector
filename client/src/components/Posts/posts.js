import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/post';
import useStyles from './styles';

function Posts() {
  const  posts  = useSelector(state => state.posts);
  console.log(posts);
  
   const classes = useStyles();
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.mainContainer} container aligitems="stretch" spacing={3}>
        {
          posts.map(post => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post}/>
            </Grid>
          ))
        }
      </Grid>
    )
  )
};

// const mapStateToProps = state => ({
//   posts: state.posts
// });

export default Posts
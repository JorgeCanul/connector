import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Post from '../Posts/Post/post'
// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import  { getPosts }  from '../../actions/posts';



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


// function Posts() {
//   const  posts  = useSelector(state => state.posts);
//   console.log(posts);
  
//    const classes = useStyles();
//   return (
//     !posts.length ? <CircularProgress /> : (
//       <Grid className={classes.mainContainer} container aligitems="stretch" spacing={3}>
//         {
//           posts.map(post => (
//             <Grid key={post._id} item xs={12} sm={6}>
//               <Post post={post}/>
//             </Grid>
//           ))
//         }
//       </Grid>
//     )
//   )
// };

// // const mapStateToProps = state => ({
// //   posts: state.posts
// // });

// export default Posts
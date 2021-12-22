import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Post from '../Posts/Post/post'
// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import  { getPosts }  from '../../actions/posts';


class Posts extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === undefined || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
              <div container aligitems="stretch" spacing={3}>
                {
                  post.map(post => (
                    <div key={post._id} item xs={12} sm={6}>
                      <Post post={post}/>
                    </div>
                  ))
                }
              </div>
            );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);


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
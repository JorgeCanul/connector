import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Post from '../Posts/Post/post'
// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import  { getPosts }  from '../../actions/postsActions'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.posts;
    // console.log(typeof posts );
    let postContent;
  // for (const items of Object.entries(posts)) {
  //   for (const [index, item] of  Object.entries(items)){
  //      postContent = item;
  //   }
  // }
  // console.log(postContent)
    if (posts.length <= 0 || loading || !Object.entries(posts)) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <Post posts={posts} />
          {/* <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} /> */}
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
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);
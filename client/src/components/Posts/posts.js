import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Post from './postItem/PotsItem'
// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import  { getPosts }  from '../../actions/postsActions'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    // this.props.getPost(this.props.match.params.id);
  }

  // componentDidMount() {
  //   this.props.getPost(this.props.match.params.id);
  // }

  render() {
    const { posts, loading } = this.props.posts;
    // console.log(posts);
    let postContent;
    if (posts.length <= 0 || loading || !Object.entries(posts)) {
      postContent = <Spinner />;
    } else {

        for (const items of Object.entries(posts)) {
          for (const [index, posts] of  Object.values(items)){
            postContent = <Post posts={posts} />
          }
        }
      ;
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from './postItem/PostItem'
// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import  { getPosts }  from '../../actions/postsActions';
import { getProfiles } from '../../actions/profileActions';



class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getProfiles();
  }

  render() {
    const { posts, loading } = this.props.posts;
    const { profiles } = this.props.profile;


    let postContent;
    if (posts.length <= 0 || loading || !Object.entries(posts)) {
      postContent = <Spinner />;
    } else {
        postContent = <PostItem  profiles={profiles} posts={posts} />
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
  getProfiles: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts,  getProfiles})(Posts);

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { profiles } = this.props.profiles;
    
    let postContent;
    if (posts === null || loading || !Object.entries(posts)) {
      postContent = <Spinner />;
    } else {
      // console.log(posts);
        postContent = posts.map(posts => <PostItem loading={loading} key={posts._id} profiles={profiles.map(profiles => profiles)}  posts={posts} />)  
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/profiles" className="btn btn-light mb-3">
                Back To Profiles
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
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  profiles: state.profile
});

export default connect(mapStateToProps, { getPosts, getProfiles })(Posts);
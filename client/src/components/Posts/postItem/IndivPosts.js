import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import { getPostsById } from '../../../actions/postsActions';
import IndividualPostsItem from './IndividualPostItem';


class IndivPosts extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      profileId: null
    }

  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }

    if(nextProps.profile) {
      this.setState({profileId: nextProps.profile.user._id});
    }
    return this.state.profileId
    
  }


  componentDidMount() {
    if(this.props.profile === undefined || this.state.loading === true) {
        console.log('Working on it!')
    } 

    // if(this.props.profile.user._id || !this.state.loading) {
        this.props.getPostsById(this.props.profile.user._id);
        console.log('Done');
    // }
  
  }

  
   render() {
     let { posts, loading } = this.props.posts
     const { errors } = this.state;

     let individualsPosts;
     if(posts === null || loading) {
      individualsPosts = <Spinner />
     } else  {
      //  if(Object.keys(posts).length > 0) {
        if(Object.keys(posts).length > 0 || loading === false){

          individualsPosts = posts.map(posts => <IndividualPostsItem key={posts._id}  posts={posts}/>)
        //  }
        }
     }
      // individualsPosts = <h1>No posts</h1> 


     if(errors) {
       console.log(errors)
    //   individualsPosts = <h1>{errors.noposts}</h1> 
     }

     return (
       <div>{individualsPosts}</div>
     )
   }
};

IndivPosts.propTypes = {
  getPostsById: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.errors
});

      
export default connect(mapStateToProps, { getPostsById})(IndivPosts)
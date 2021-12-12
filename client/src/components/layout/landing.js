import React, { Component } from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { connect } from 'react-redux';
import memories from '../../img/memories.jpg';
import Posts from '../Posts/posts';
import Form from '../Form/form';
import { getPosts } from '../../actions/posts';

 class Landing extends Component {
   componentDidMount() {
    this.props.getPosts();
   }

   render() {
   const makeStyles = {
      appBar: {
        borderRadius: 15,
        margin: '0 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
    };

    return (
      
      <Container maxidth="lg">
        <AppBar style={makeStyles.appBar} color="inherit">
          <Typography style={makeStyles.heading} variant="h2" alingn="center">
            Memories
          </Typography>
          <img style={makeStyles.image}  src={memories} alt="memories" height="90"/>
        </AppBar>
        <div style={{paddingTop: '6.635rem'}}>
        {/* <Container> */}
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        {/* </Container> */}

        </div>

      </Container>
    )
   }
};



export default connect(null, {getPosts})(Landing);

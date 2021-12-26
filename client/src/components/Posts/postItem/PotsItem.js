import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import Spinner from '../../common/Spinner';

function Post({ posts }) {
  let item;
  
  const classes = useStyles();
  if(posts === null ) {
    item = <Spinner />
  } else {
    for (const [ index, items ] of Object.entries(posts)){

    item = (<Card key={items._id} className={classes.card}>
        <CardMedia className={classes.media} image={items.selectedFile} title={items.title}/>
        <div className={classes.overlay}>
          <Typography variant="h6">{items.creator}</Typography>
          <Typography variant="body2">{moment(items.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={() => {}}>
            <MoreHorizIcon fontSize="medium"/>
          </Button>
        </div>
        <div className={classes.details}>
        {/* <Typography variant="body2" color="textSecondary">
          {`#${items.tags.map(tag => tag)}`}
        </Typography> */}
        </div>
        <CardContent>
           <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>{items.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => {}}>
            <ThumbUpAltIcon fontSize="small"/>
            Like {items.likeCount}
          </Button>
          <Button size="small" color="primary" onClick={() => {}}>
            <DeleteIcon fontSize="small"/>
            Delete
          </Button>
        </CardActions>
      </Card>);
    }
  }
   
  return (
    // <Card className={classes.card}>
    //   <CardMedia className={classes.media} image={posts.selectedFile} title={posts.title}/>
    //   <div className={classes.overlay}>
    //     <Typography variant="h6">{posts.creator}</Typography>
    //     <Typography variant="body2">{moment(posts.createdAt).fromNow()}</Typography>
    //   </div>
    //   <div className={classes.overlay2}>
    //     <Button style={{color: 'white'}} size="small" onClick={() => {}}>
    //       <MoreHorizIcon fontSize="medium"/>
    //     </Button>
    //   </div>
    //   <div className={classes.details}>
    //   {/* <Typography variant="body2" color="textSecondary">
    //     {`#${posts.tags.map(tag => tag)}`}
    //   </Typography> */}
    //   </div>
    //   <CardContent>
    //      <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>{posts.message}</Typography>
    //   </CardContent>
    //   <CardActions className={classes.cardActions}>
    //     <Button size="small" color="primary" onClick={() => {}}>
    //       <ThumbUpAltIcon fontSize="small"/>
    //       Like {posts.likeCount}
    //     </Button>
    //     <Button size="small" color="primary" onClick={() => {}}>
    //       <DeleteIcon fontSize="small"/>
    //       Delete
    //     </Button>
    //   </CardActions>
    // </Card>
    {item}
  )
 
};

export default Post
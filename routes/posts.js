const express = require('express');
const passport = require('passport');
const router = express.Router();
const PostMessage = require('../models/PostMessage');
const Profile = require('../models/Profile');

//@router /api/posts/post
//@desc. crate post
//@access Private
router.post('/posts', passport.authenticate('jwt',
 {session: false}), (req, res) => {
   const newPost = PostMessage({
      user: req.user.id,
      title: req.body.title,
      message: req.body.message,
      creator: req.body.creator,
      tags: req.body.tags,
      selectedFile: req.body.selectedFile
   });
  newPost.save()
  .then(post => res.json(post))
  .catch(()=> console.log('Error here'));
});

//@router /api/posts/posts/
//@desc. get all
//@access Public
router.get('/posts', (req, res) => {
  PostMessage.find()
  .populate("user", ["name", "avatar", "email"])
  .sort({date: -1})
  .then(postMessages => {
    if(postMessages) {
      res.status(200).json(postMessages);
    } else {
      res.status(400).json({message: 'No Post'})
    }
  })
  .catch(err => console.log(err));
});

////////////////////////////////////////////////////
//@router /api/posts/posts
//@desc. get all posts by individual
//@access Public
router.get("/posts/:id", 
 (req, res) => {
  const errors = {};
  PostMessage.find({ user: req.params.id})
    .sort({date: -1})
    .populate("user", ["name", "avatar", "email"])
    .then((posts) => {
      if(posts.length > 0) {
       return res.status(200).json(posts)
      } else {
        errors.noposts = "There is no posts for this user"
        res.status(404).json(errors);
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

////////////////////////////////////////////////////

// @route   GET api/posts/post/:id
// @desc    Get post by id
// @access  Public
router.get('/post/:id', (req, res) => {
  PostMessage.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});


// @route   DELETE api/posts/post/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/post/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      PostMessage.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);
// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}), 
(req, res) => {
  PostMessage.findOne({ user: req.user.id})
  .then(post => {
    if(post.likeCount.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ alreadyliked: 'User already liked post'})
    }
    // Add user id to likes array
    post.likeCount.unshift({ user: req.user.id });
    post.save().then(post => res.json(post))
  })
  .catch(err => res.status(400).json({ postnotfound: 'No post found'}));
}); 

//@router /update
//@desc. post UPDATE POST
//@access Public
// router.patch('/:id', (req, res) => {
//   const {id: _id } = req.params;
//   if()
// });

module.exports = router
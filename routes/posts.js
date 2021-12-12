const express = require('express');
const router = express.Router();
const PostMessage = require('../models/PostMessage');

//@router /posts
//@desc. get POST
//@access Public
router.get('/post', (req, res) => {
  PostMessage.find()
  .then(postMessages => {
    if(postMessages) {
      res.status(200).json(postMessages);
    } else {
      res.status(400).json({message: 'No Post'})
    }
  })
  .catch(err => console.log(err));

});

//@router /posts
//@desc. post POST
//@access Public
router.post('/post', (req, res) => {
  const newPost = new PostMessage(req.body);
  newPost.save()
  .then(post => res.json(post))
  .catch(()=> console.log('Error here'));
});

//@router /update
//@desc. post UPDATE POST
//@access Public
// router.patch('/:id', (req, res) => {
//   const {id: _id } = req.params;
//   if()
// });

module.exports = router
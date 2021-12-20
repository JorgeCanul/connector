const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String
  },
  message: {
    type: String,
  },
  creator: {
    type: String,
  }, 
  tags: {
    type: [String],
  }, 
  selectedFile:{
    type: String
  },
  likeCount: [
    { 
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
   }
],
  creatorAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = PostMessage = mongoose.model('post', PostSchema);
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');
const router = express.Router();
const valiDatorRegister = require('../validation/profile');


//@router /register
//@desc. post Register new user
//@access Public
router.post('/', (req, res) => {
  // validate input
  const {errors, isValid } = valiDatorRegister(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  // look if email, else create new user
  Profile.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      return res.status(400).json({email: 'Email already exist'});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      // new user
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      }
      console.log(newUser)
      // hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log('Error in bcrypt');
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) console.log('Error in hash');
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(() => console.log('Error here!'));
        });
      });
    }
  })
  .catch(() => console.log('error'));

});

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Profile = require('../models/Profile');
const router = express.Router();
const valiDatorRegister = require('../validation/profile');
const validateLogin = require('../validation/login');
const keys = require('../config/keys');


//@router /register
//@desc. post Register new user
//@access Public
router.post('/register', (req, res) => {
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
      const newUser = new Profile({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      // hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user => res.status(200).json(user))
          .catch(() => console.log('Error here!'));
        });
      });
    }
  })
  .catch(() => console.log('error'));
});

//@router /api/user/login
//@desc. post Login user
//@access Public

router.post('/login',  (req, res) => {
  // validate
  const { errors, isValid } = validateLogin(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({email: req.body.email})
  .then(user => {
    if(!user) {
      return res.status(404).json({email: 'User not found'});
    } 
    bcrypt.compare(req.body.password, user.password)
    .then(isMatch => {
      if(isMatch) {
        //payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            return res.json({token: 'Bearer ' + token});
          });
      } else {
        return res.status(400).json({passport: 'Incorrect password'});
      }
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});


module.exports = router;
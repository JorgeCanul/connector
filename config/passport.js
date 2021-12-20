// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const keys = require('./keys');
// const Profile = require('../models/Profile');


// const opts={};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//   passport.use(
//     new JwtStrategy(opts, (payload, done) => {
//       Profile.findById(payload.id)
//         .then(user => {
//           if (user){
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch(() => console.log('error!!!'));
//     })
//   );
// };


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const Profile = require('../models/Profile');


const opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user){
            console.log(user)
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
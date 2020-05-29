const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");
// const keys = require("./keys");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; //|| keys.JWT_SECRET_KEY;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// used for authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: JWT_SECRET_KEY,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return null, false;
      });
    }
  )
);

// middleware for authentication using password and username, first time when user logs in.
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      //if something bad happens to db
      if (err) return done(err);
      //if user not on db
      if (!user) return done(null, false);
      // check for password
      user.comparePassword(password, done);
    });
  })
);

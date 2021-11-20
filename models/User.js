const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  originalName: {
    type: String,
    min: 6,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  coverPhotoUrl: {
    type: String,
  },
  userIntro: {
    type: String,
    max: 2000,
  },
  createdAt: {
    type: Date,
  },
  lastUpdated: {
    type: Date,
  },

  bio: {
    type: String,
    
  },
  profile_for: {
    type: String,
    
  },
  //username is firdst name
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
    
  },
  gender: {
    type: String,
    
  },
  dob: {
    type: String,
    
  },
  religion: {
    type: String,
    
  },
  caste: {
    type: String,
    
  },
  motherTounge: {
    type: String,
    
  },
  state: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  country: {
    type: String,
    
  },
  height: {
    type: String,
    
  },
  martialStatus: {
    type: String,
    
  },
  food_type: {
    type: String,
    
  },
  smoker: {
    type: String,
    
  },
  drinker: {
    type: String,
    
  },
  imagePath: {
    type: String
  },
  stage1:{
    type: String
  },
  stage2:{
    type: String
  },
  stage3: {
    type: String
  },
  verification:{
    type: Boolean
  },

  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

// Mongoose PRE Hook, this code executes right before we save. We need to hash the password before we save it to DB.
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);

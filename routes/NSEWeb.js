const express = require("express");
const nseDataRouter = express.Router();
const passport = require("passport");
const passportCongfig = require("../passport");
const JWT = require("jsonwebtoken");
const NSEData = require("../models/NseData");
const Todo = require("../models/Todo");
const keys = require("../config/keys");
const responseHandler = require("./Errors");
const url = require('url');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(keys.GOOGLE_CLIENT_ID);
const querystring = require('querystring');
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect(
  keys.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connected");
  }
);

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "songs",
  });
});



nseDataRouter.get(
  "/data/:data",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var data = req.params.data
    console.log(data)
    // console.log(queryObject);
    var regex = new RegExp( data.toLocaleUpperCase() , "g");
    // at this point, the line above is the same as: var regex = /#abc#/g;
    NSEData.find({ symbol: regex })
    .limit(100)
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(200).json({ data: document, authenticated: true });
        }
      });
  }
);


module.exports = nseDataRouter;

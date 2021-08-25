const express = require("express");
const nseRouter = express.Router();
const NSEData = require("../models/NseData");
const keys = require("../config/keys");
const fetch = require("node-fetch");
const axios = require('axios');
const mongoose = require("mongoose");

mongoose.connect(
  keys.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connected");
  }
);

const db = mongoose.connection;


db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});


nseRouter.get(
  "/get",
  (req, res) => {
    // fetch("https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json", {
    //     method: 'get'
    // }).then((res) => {
    //    console.log(res)
    // })
    axios.get('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')
  .then(function (response) {
    // handle success
    var count = 0
    for (const child of response.data) {
        const doc1 = new NSEData({
            token :child.token,
            symbol :child.symbol,
            name :child.name,
            expiry :child.expiry,
            strike :child.strike,
            lotsize :child.lotsize,
            instrumenttype :child.instrumenttype,
            exch_seg :child.exch_seg,
            tick_size :child.tick_size,
            value :child.symbol,
            label :child.name,
        });
        doc1.save(function(err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
            console.log(count++)
          });
        //console.log(child);
      }
    //console.log(response.data)
    console.log(Object.keys(response));
  })
    res.json({ user: { username: "", role: "" }, success: true });
  }
);


nseRouter.get(
  "/data/:data",
  
  (req, res) => {
    var data = req.params.data
    console.log(data)
    // console.log(queryObject);
    var regex = new RegExp( data.toLocaleUpperCase() , "g");
    // at this point, the line above is the same as: var regex = /#abc#/g;
    NSEData.find({ name: regex })
    .limit(100)
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {

          res.status(200).json({ data: document });
        }
      });
  }
);


module.exports = nseRouter;

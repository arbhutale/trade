const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    token: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  expiry: {
    type: String
  },
  strike: {
    type: String
  },
  lotsize: {
    type: String
  },
  instrumenttype: {
    type: String
  },
  exch_seg: {
    type: String
  },
  tick_size: {
    type: String
  },
  value: {
    type: String
  },
  label: {
    type: String
  }

});

module.exports = mongoose.model("NSEData", TodoSchema);

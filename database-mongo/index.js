var mongoose = require("mongoose");
// connect to MLAB database
mongoose.connect("mongodb://Ghadeer:gg835864@ds211635.mlab.com:11635/pirates"); 
var db = mongoose.connection;

// checking database connection
db.on("error", function() {
  console.log("mongoose connection error");
});
db.once("open", function() {
  console.log("mongoose connected successfully");
});

// create schema takes the requested fields for our json data
var itemSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    isCaptured: Boolean
  },
  {
    collection: "eila"
  }
);

// creating our model
var Item = mongoose.model("Item", itemSchema);

// Retrieving data from database
module.exports.selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

// fake data for the Authentication
var records = [
  { id: 1, username: "Ghadeer", token: "9902020059" },
  { id: 2, username: "Laith", token: "jouana" }
];

// checking the passed token for the Authentication
module.exports.findByToken = function(token, cb) {
  process.nextTick(function() {
    for (var i = 0; i < records.length; i++) {
      if (records[i].token === token) {
        return cb(null, records[i]);
      }
    }
    return cb(null, null);
  });
};

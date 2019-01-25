var mongoose = require("mongoose");
mongoose.connect("mongodb://Ghadeer:gg835864@ds211635.mlab.com:11635/pirates"); 
var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

var itemSchema = mongoose.Schema({
  name: String,
  age: Number,
  isCaptured: Boolean
},{
	collection: 'eila'
});

var Item = mongoose.model("Item", itemSchema); 
var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
module.exports.selectAll = selectAll;
module.exports.users = require('./users');




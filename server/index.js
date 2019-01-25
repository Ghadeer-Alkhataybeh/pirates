var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var items = require("../database-mongo/index.js");
var db = require("../database-mongo/index.js");
var passport = require("passport");
var Strategy = require("passport-http-bearer").Strategy;
var catchThePirates = require("./catchThePirates");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("morgan")("combined"));

// second task route responsing with json data from m-lab database
app.get("/pirates", function(req, res) {
  items.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//third task (part 1) to add an authentication
passport.use(
  new Strategy(function(token, cb) {
    db.findByToken(token, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

//third task (part2) route responsing with json data showing the number of pirates faces from the 1st task
app.get(
  "/pirates/countPirates",
  passport.authenticate("bearer", { session: false }),
  function(req, res) {
    // requesing the piratesFaces from the given API
    request("https://eila-pirate-api.herokuapp.com/pirates/prison", function(
      error,
      response,
      body
    ) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var piratesCount = catchThePirates.catchThePirates(data.faces);
        res.json({ piratesFound: piratesCount });
      }
    });
  }
);

app.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000!");
});

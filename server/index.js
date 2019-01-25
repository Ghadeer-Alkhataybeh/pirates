var express = require("express");
var bodyParser = require("body-parser");

var request = require("request");
var items = require("../database-mongo/index.js");
var db = require("../database-mongo/index.js");
var passport = require ("passport")
const basicAuth = require("express-basic-auth");
var Strategy = require('passport-http-bearer').Strategy;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////////////////
passport.use(new Strategy(
  function(token, cb) {
    db.users.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  app.use(require('morgan')('combined'));
//////////////////////////////////////////



app.get(
  "/pirates",function(req, res) {
    items.selectAll(function(err, data) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
  }
);

app.get("/pirates/countPirates", passport.authenticate('bearer', { session: false }),
function(req, res) {
  request("https://eila-pirate-api.herokuapp.com/pirates/prison", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      let arrWithEyes = [];
      let arrWithNoses = [];
      let pirateFace = [];
      data.faces.forEach(ele => {
        let face = ele.split("");
        if (face[0] === ";" || face[0] === "8") {
          arrWithEyes.push(ele);
        }
      });

      arrWithEyes.forEach(elem => {
        let face = elem.split("");
        if (face.length === 3) {
          if (face[1] === "-" || face[1] === "~") {
            arrWithNoses.push(elem);
          }
        } else {
          arrWithNoses.push(elem);
        }
      });

      arrWithNoses.forEach(element => {
        let face = element.split("");
        if (face.length == 3) {
          if (face[2] === ")" || face[2] === "|") {
            pirateFace.push(element);
          }
        } else if (face.length === 2)
          if (face[1] === ")" || face[1] === "|") {
            pirateFace.push(element);
          }
      });
      res.json({ piratesFound: pirateFace.length });
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000!");
});

var express = require('express');
var bodyParser = require('body-parser');

var request = require('request');
var items = require('../database-mongo/index.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pirates', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
      console.log("data",data)
    }
  });
  
});


app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});



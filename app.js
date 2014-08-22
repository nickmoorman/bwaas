
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Load buzzwords
var buzzwords = require('./buzzwords.js').buzzwords;
// Define function to get sub-object from object
// Stolen from: http://stackoverflow.com/a/15106541
function getRandom(obj) {
  var keys = Object.keys(obj);

  return obj[keys[keys.length * Math.random() << 0]];
};

app.get('/', function(req, res) {
  res.render('index', { buzzwords: buzzwords });
});
app.get('/:cat', function(req, res) {
  var cat = req.params.cat;
  var buzzwordSet;
  if (cat in buzzwords) {
    buzzwordSet = buzzwords[cat];
  } else {
    buzzwordSet = getRandom(buzzwords);
  }

  var category = buzzwordSet['name'];
  var word = getRandom(buzzwordSet['words']);

  res.render('word', { word: word, category: category });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

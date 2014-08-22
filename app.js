
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
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

app.get('/', routes.index);
app.get('/random', function(req, res) {
  var buzzwords = require('./buzzwords.js').buzzwords;
  var getRandom = function(obj) {
    var keys = Object.keys(obj);

    return obj[keys[keys.length * Math.random() << 0]];
  };
  var randomSet = getRandom(buzzwords);
  var category = randomSet['name'];
  var word = getRandom(randomSet['words']);

  res.render('word', { word: word, category: category });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

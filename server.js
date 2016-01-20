'use strict';

var express       = require('express');
var path          = require('path');
var app           = express();

app.use('/', express.static('dist'));

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
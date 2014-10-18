var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('./logger');

var app = express();

logger.info('Server is running on port 3030');

var staticPath = path.normalize(__dirname + '/../public');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
	res.status(404);
	//logger.error('404: %s', req.url);
	res.send('Page not found');
	return;
});

var routes = require('./routes')(app);
var server = app.listen(3030);

module.exports = app;

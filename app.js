const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// public
	app.use( '/static',express.static('public') );

// body-paser
	app.use(bodyParser.urlencoded({extended:false}));

// view egine
	app.set('view engine', 'pug');

// routes
	const mainRoutes = require('./routes');
	app.use(mainRoutes);

app.listen(3000,() => {
	console.log('App running on 3000');
});
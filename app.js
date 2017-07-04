const express = require('express');
const app = express();

// public
	app.use( '/static',express.static('public') );

// view egine
	app.set('view engine', 'pug');

// routes
	const mainRoutes = require('./routes');
	app.use(mainRoutes);

app.listen(3000,() => {
	console.log('App running on 3000');
});
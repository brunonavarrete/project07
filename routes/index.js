const express = require('express');
const router = express.Router();
const requests = require('../requests');
const config = require('../config');
const Twit = require('twit');
const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});

/* GET */
	router.get('/', (req, res) => { // home
		// locals
		res.locals = {
			info:requests.data.info,
			tweets:requests.data.tweets,
			dms:requests.data.dms,
			friends:requests.data.friends,
		}
		// render
		res.render('index');
	});

	router.get('/error',(req,res) => { // error
		res.locals = {err:'error'};
		res.render('error');
	});

/* POST */
	router.post('/', (req, res) => { // home
		// post new tweet
		T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
			//locals
			res.locals = {
				info:requests.data.info,
				tweets:requests.data.tweets,
				dms:requests.data.dms,
				friends:requests.data.friends,
				newTweet: data
			};
			// remove last tweet leaving only 5
			delete res.locals.tweets[4];
			// render
			res.render('index');
		});
	});

/* ERROR */
	router.use( (req, res, next) => { // 404
		const err = new Error('the page you\'re looking for was Not Found');
		err.status = 404;
		next(err);
	});

	router.use( (err, req, res, next) => {
		res.locals.err = err;
		res.status(err.status);
		res.render('error',err);
	});

module.exports = router;
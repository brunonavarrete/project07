const express = require('express');
const router = express.Router();
const requests = require('../requests');

/* GET */
	router.get('/', (req, res) => {

		res.render('index',{
			info:requests.data.info,
			tweets:requests.data.tweets,
			followers:requests.data.followers,
		});

	});

module.exports = router;
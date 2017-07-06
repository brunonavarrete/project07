const config = require('./config');
const Twit = require('twit');
const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});
const username = config.username; // replace with username

// variables
	let data = {
		info: {},
		tweets: {},
		dms: {},
		friends: {}
	};

// T functions
// user info
	T.get('users/show', {screen_name:username}, (err,d,res) => {
		data.info.name = d.name;
		data.info.screen_name = d.screen_name;
		data.info.profile_image_url = d.profile_image_url_https;
		data.info.background_image_url = d.profile_background_image_url_https;
		data.info.friends_count = d.friends_count;
	});

// tweets
	T.get('statuses/user_timeline', {screen_name:username,count:5}, (err,d,res) => {
		for (let i = 0; i < d.length; i++) {
			data.tweets[i] = d[i];
		};
	});

// friends
	T.get('friends/list', {screen_name:username,count:5}, (err,d,res) => {
		for (let i = 0; i < d.users.length; i++) {
			data.friends[i] = d.users[i];
		};
	});

// dms
	T.get('direct_messages', {count:5}, (err,d,res) => {
		for (let i = 0; i < d.length; i++) {
			data.dms[i] = d[i];
		};
	});

module.exports.data = data;
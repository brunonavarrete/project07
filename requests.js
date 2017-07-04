const https = require('https');
const config = require('./config');
let data = {};
let followers = {};
let info = {};
let tweets = {};

// get info
	// user info
		const getInfoOptions = {
			hostname: 'api.twitter.com',
			path: `/1.1/users/show.json?screen_name=${config.username}`,
			headers: {
				'Authorization': `Bearer ${config.bearer_token}`
			},
			method: 'GET',
		}
		const getInfo = https.request( getInfoOptions, getRes => {
			let body = '';
			getRes.on( 'data', data => {
				body+= data.toString();
			});
			getRes.on( 'end', () => {
				body =  JSON.parse(body);
				info.name = body.name;
				info.screen_name = body.screen_name;
				info.profile_image_url = body.profile_image_url_https;
				info.background_image_url = body.profile_background_image_url_https;
				info.followers_count = body.followers_count;
			});
		});
		getInfo.end();

	// tweets
		const getTweetsOptions = {
			hostname: 'api.twitter.com',
			path: `/1.1/statuses/user_timeline.json?screen_name=${config.username}&count=5`,
			headers: {
				'Authorization': `Bearer ${config.bearer_token}`
			},
			method: 'GET',
		}
		const getTweets = https.request( getTweetsOptions, getRes => {
			let body = '';
			getRes.on( 'data', data => {
				body+= data.toString();
			});
			getRes.on( 'end', () => {
				body =  JSON.parse(body);
				for (var i = 0; i < body.length; i++) {
					tweets[i] = body[i];
				};
				console.log(tweets[0]);
			});
		});

		getTweets.end();

	// followers
		const getFollowersOptions = {
			hostname: 'api.twitter.com',
			path: `/1.1/followers/list.json?count=5&screen_name=${config.username}`,
			headers: {
				'Authorization': `Bearer ${config.bearer_token}`
			},
			method: 'GET',
		}
		const getFollowers = https.request( getFollowersOptions, getRes => {
			let body = '';
			getRes.on( 'data', data => {
				body+= data.toString();
			});
			getRes.on( 'end', () => {
				for (var i = 0; i < JSON.parse(body).users.length; i++) {
					followers[i] = JSON.parse(body).users[i];
				};
			});
		});

		getFollowers.end();


data.info = info;
data.tweets = tweets;
data.followers = followers;

module.exports.data = data;
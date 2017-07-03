const express = require('express');
const https = require('https');
const app = express();

app.get('/', (req, res)=>{
	// const request = https.get('https://api.twitter.com/1.1/search/tweets.json?q=%23bf_no', res => {
	// 	let body = '';
	// 	res.on('data',(data) => {
	// 		body += data.toString();
	// 	});
	// 	res.on('end',() => {
	// 		console.log(body);
	// 	});
	// });
	res.send('Hello world!!');
});

app.listen(3000,() => {
	console.log('App running on 3000');
});
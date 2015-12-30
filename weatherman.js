#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var querystring = require("querystring");

var geoUrl = 'http://freegeoip.net/json';
var yqlUrl = 'https://query.yahooapis.com/v1/public/yql?';

program
	.usage('[options]')
	.option('-C, --celsius', 'Show temperatures in celsius')
	.option('-z, --zip <zip>', 'Return weather for a specific zip code')
	.parse(process.argv);

if (program.zip) {
	getWeather(program.zip);
}
else {
	request(geoUrl, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			getWeather(data.zip_code);
		}
	});
}

function getWeather(zip) {
	var yqlArgs = {
		q: 'select * from weather.forecast where location=' + zip + ' and u=' + (program.celsius ? '"c"' : '"f"'),
		format: 'json'
	};

	yqlUrl += querystring.stringify(yqlArgs);

	request(yqlUrl, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);

			var channel = data.query.results.channel;
			var title = channel.item.title;
			var temp = channel.item.condition.temp;
			var unit = channel.units.temperature;
			var text = channel.item.condition.text;
			var forecast = channel.item.forecast;

			console.log('');
			console.log(title + ':');
			console.log('%s, %s °%s', text, temp, unit);

			console.log('');
			console.log('Forecast:');
			
			for (var i = 0; i < forecast.length; i++) {
				var fc = forecast[i];
				console.log('%s - %s, %s°/%s°', fc.day, fc.text, fc.high, fc.low);
			};

			console.log('');
		}
	});
}
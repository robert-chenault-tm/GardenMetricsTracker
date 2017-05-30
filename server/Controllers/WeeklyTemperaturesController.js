var fs = require('fs');
var WeeklyTemperature = require('../Models/WeeklyTemperaturesModel.js');

module.exports.get = function(req, res) {
	var query = WeeklyTemperature.findOne({weekFormatted: req.params.week});
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(results);
			res.end();
		}
	});
};

module.exports.getAll = function(req, res) {
	var query = WeeklyTemperature.find();
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(results);
			res.end();
		}
	});
};

module.exports.save = function(req, res) {
	var query = WeeklyTemperature.remove({weekFormatted: req.body.weekFormatted});
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			var addedWeek = new WeeklyTemperature({
				week: req.body.week,
				weekFormatted: req.body.weekFormatted,
				minTemp: req.body.minTemp,
				maxTemp: req.body.maxTemp,
				avgTemp: req.body.avgTemp
			});
			addedWeek.save();
			res.setHeader('Content-Type', 'application/json');
			res.send('');
			res.end();
		}
	});
};

module.exports.remove = function(req, res) {
	var query = WeeklyTemperature.remove({weekFormatted: req.params.week});
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(results);
			res.end();
		}
	});
};

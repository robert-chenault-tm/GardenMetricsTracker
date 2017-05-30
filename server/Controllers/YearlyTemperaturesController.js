var fs = require('fs');
var YearlyTemperature = require('../Models/YearlyTemperaturesModel.js');

module.exports.get = function(req, res) {
	var query = YearlyTemperature.findOne({year: req.params.year});
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
	var query = YearlyTemperature.find();
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
	var query = YearlyTemperature.remove({year: req.body.year});
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			var addedYear = new YearlyTemperature({
				year : req.body.year,
			    monthRanges : req.body.monthRanges
			});
			addedYear.save();
			res.setHeader('Content-Type', 'application/json');
			res.send('');
			res.end();
		}
	});
};

module.exports.remove = function(req, res) {
	var query = YearlyTemperature.remove({year: req.params.year});
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

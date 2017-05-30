var fs = require('fs');
var Metric = require('../Models/MetricsModel.js');

module.exports.get = function(req, res) {
	var query = Metric.findById(req.params._id);
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
	var query = Metric.find({plantID: req.params.plantID});
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
	var query = Metric.remove({weekStart: req.body.weekStart});
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			var addedMetric = new Metric({
				plantID : req.body.plantID,
			    weekStart : req.body.weekStart,
			    curWater : req.body.curWater,
			    desiredWater : req.body.desiredWater,
			    pestDamage : req.body.pestDamage,
			    yieldAmount : req.body.yieldAmount
			});
			addedMetric.save();
			res.setHeader('Content-Type', 'application/json');
			res.send('');
			res.end();
		}
	});
};

module.exports.remove = function(req, res) {
	var query = Metric.findByIdAndRemove(req.params._id);
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

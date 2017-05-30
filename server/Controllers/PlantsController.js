var fs = require('fs');
var Plant = require('../Models/PlantsModel.js');
var Metric = require('../Models/MetricsModel.js');

module.exports.get = function(req, res) {
	var query = Plant.findById(req.params._id);
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
	var query = Plant.find();
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
	if(req.body._id == '-1') {
		var addedPlant = new Plant({
			plantName : req.body.plantName,
		    localID : req.body.localID,
		    plantBreed : req.body.plantBreed,
		    location : req.body.location,
		    inchRootRadius : req.body.inchRootRadius,
		    plantDate : req.body.plantDate
		});
		addedPlant.save();
		res.setHeader('Content-Type', 'application/json');
		res.send('');
		res.end();
	} else {
		var query = Plant.findByIdAndUpdate(req.body._id, {
			$set: {
				plantName : req.body.plantName,
			    localID : req.body.localID,
			    plantBreed : req.body.plantBreed,
			    location : req.body.location,
			    inchRootRadius : req.body.inchRootRadius,
			    plantDate : req.body.plantDate
			}
		});
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
	}
};

module.exports.remove = function(req, res) {
	var query = Plant.findByIdAndRemove(req.params._id);
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			var query2 = Metric.remove({plantID: req.params._id});
			query2.exec(function(err, results) {
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
		}
	});
};

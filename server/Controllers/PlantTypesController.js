var fs = require('fs');
var PlantType = require('../Models/PlantTypesModel.js');
var Plant = require('../Models/PlantsModel.js');

module.exports.get = function(req, res) {
	var query = PlantType.findById(req.params._id);
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

module.exports.getFromPlantID = function(req, res) {
	var query = Plant.findById(req.params._id);
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			var query2 = PlantType.find({name: results.plantName});
			query2.exec(function(err, typeResults) {
				if(err) {
					console.log(err);
					res.setHeader('Content-Type', 'application/json');
					res.send(err);
					res.end();
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send(typeResults[0]);
					res.end();
				}
			});
		}
	});
};

module.exports.getAll = function(req, res) {
	var query = PlantType.find();
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
	var query = PlantType.remove({name: req.body.name});
	query.exec(function(err, results) {
		if(err) {
			res.setHeader('Content-Type', 'application/json');
			res.send(err);
			res.end();
		} else {
			var addedPlantType = new PlantType({
				name : req.body.name,
				defaultMeasurement : req.body.defaultMeasurement,
				defaultInchRootRadius : req.body.defaultInchRootRadius,
				plantBreeds : req.body.plantBreeds
			});
			addedPlantType.save();
			res.setHeader('Content-Type', 'application/json');
			res.send('');
			res.end();
		}
	});
};

module.exports.remove = function(req, res) {
	var query = PlantType.findByIdAndRemove(req.params._id);
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

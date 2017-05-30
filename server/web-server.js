var express = require('express');
var path = require('path');
var plants = require('./Controllers/PlantsController.js');
var plantTypes = require('./Controllers/PlantTypesController.js');
var yearlyTemperatures = require('./Controllers/YearlyTemperaturesController.js');
var weeklyTemperatures = require('./Controllers/WeeklyTemperaturesController.js');
var metrics = require('./Controllers/MetricsController.js');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/garden', function(err, db) {
	if(!err) {
		console.log('Connected to the garden database.');
	} else {
		console.log("Error connecting to database:");
		console.log(err);
	}
});

var rootPath = path.normalize(__dirname + '/../');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app'));


app.get('/data/plant/:_id', plants.get);
app.get('/data/plant/', plants.getAll);
app.post('/data/plant/:_id', plants.save);
app.delete('/data/plant/:_id', plants.remove);
app.get('/data/plantType/:_id', plantTypes.get);
app.get('/data/plantType/', plantTypes.getAll);
app.post('/data/plantType/:_id', plantTypes.save);
app.delete('/data/plantType/:_id', plantTypes.remove);
app.get('/data/yearlyTemperature/:year', yearlyTemperatures.get);
app.get('/data/yearlyTemperature/', yearlyTemperatures.getAll);
app.post('/data/yearlyTemperature/:year', yearlyTemperatures.save);
app.delete('/data/yearlyTemperature/:year', yearlyTemperatures.remove);
app.get('/data/metric/:plantID/:_id', metrics.get);
app.get('/data/metric/:plantID', metrics.getAll);
app.post('/data/metric/:plantID/:_id', metrics.save);
app.delete('/data/metric/:plantID/:_id', metrics.remove);
app.get('/data/plantTypeFromPlant/:_id', plantTypes.getFromPlantID);
app.get('/data/weeklyTemperature/:week', weeklyTemperatures.get);
app.get('/data/weeklyTemperature/', weeklyTemperatures.getAll);
app.post('/data/weeklyTemperature/:week', weeklyTemperatures.save);
app.delete('/data/weeklyTemperature/:week', weeklyTemperatures.remove);




app.get('*', function(req, res) {res.sendFile(rootPath + '/app/index.html'); });
app.listen(8080);
console.log('Listening on port 8080...');
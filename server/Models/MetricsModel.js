var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metricSchema = new Schema({
	plantID : String,
    weekStart : Date,
    curWater : {amount: Number, measurement: String},
    desiredWater : {amount: Number, measurement: String},
    pestDamage : [{source: String, degree: Number}],
    yieldAmount : Number	
});

module.exports = mongoose.model('WeeklyMetrics', metricSchema, 'WeeklyMetrics');
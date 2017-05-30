gardenApp.factory('TemperatureData', function($resource) {
var yearlyResource = $resource('/data/yearlyTemperature/:year', { year: '@year'});
var weeklyResource = $resource('/data/weeklyTemperature/:week', { week: '@week'});
	
	return {
		getYear: function(year) {
			return yearlyResource.get({year: year});
		},
		getAllYears: function() {
			return yearlyResource.query();
		},
		//year in this context is an object to be sent back to the database, not a number like the others
		saveYear: function(year) {
			return yearlyResource.save(year);
		},
		deleteYear: function(year) {
			return yearlyResource.remove({year: year});
		},
		getWeek: function(week) {
			return weeklyResource.get({week: week});
		},
		getAllWeeks: function() {
			return weeklyResource.query();
		},
		//week in this context is an object to be sent back to the database, not a number like the others
		saveWeek: function(week) {
			return weeklyResource.save(week);
		},
		deleteWeek: function(week) {
			return weeklyResource.remove({week: week});
		}
	};
});
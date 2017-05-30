gardenApp.factory('MetricData', function($resource) {
	var resource = $resource('/data/metric/:plantID/:_id', {plantID: '@plantID',  _id: '@_id'});
	
	
	return {
		getMetric: function(plantID, id) {
			return resource.get({plantID: plantID, _id: id});
		},
		getAllMetrics: function(plantID) {
			return resource.query({plantID: plantID});
		},
		saveMetric: function(metric) {
			return resource.save(metric);
		},
		deleteMetric: function(plantID, id) {
			return resource.remove({plantID: plantID, _id: id});
		}
	};
});
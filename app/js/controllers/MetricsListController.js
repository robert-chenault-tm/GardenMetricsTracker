gardenApp.controller('MetricsListController', function($scope, $routeParams, $location, MetricData) {
	$scope.plantID = $routeParams.plantID;
	MetricData.getAllMetrics($routeParams.plantID)
	.$promise
	.then(function(weeks) {
		$scope.weeks = weeks;	
		$scope.noMetrics = $scope.weeks.length == 0;
	})
	.catch(function(err) {
		console.log(err);
	});
	
	$scope.generateTitle = function(week) {
		var beginning = moment(week.weekStart);
		var end = moment(week.weekStart).add(7, 'days');
		return beginning.format('MMMM Do YYYY') + ' - ' + end.format('MMMM Do YYYY');
	}
	
	$scope.addCurrentWeek = function() {
		var lastSunday = moment(new Date()).day(0);
		$location.url('/plant/' + $routeParams.plantID + '/addMetric/' + lastSunday.format('YYYY-MM-DD'));
	}
	
	$scope.addWeek = function() {
		if(typeof $scope.newDate != 'undefined') {
			$location.url('/plant/' + $routeParams.plantID + '/addMetric/' + moment($scope.newDate).day(0).format('YYYY-MM-DD'));
		}
	}
	
	$scope.toPlant = function() {
		$location.url('/plant/' + $routeParams.plantID);
	}
});
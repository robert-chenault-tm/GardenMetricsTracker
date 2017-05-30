gardenApp.controller('WeeklyTemperatureListController', function($scope, $location, TemperatureData) {
	TemperatureData.getAllWeeks()
	.$promise
	.then(function(weeks) {
		$scope.weeks = weeks;
		$scope.noWeeks = $scope.weeks.length < 1;
	})
	.catch(function(err) {
		console.log(err);
	});
	
	$scope.addCurrentWeek = function() {
		addWeek(moment(new Date()));
	}
	
	$scope.addWeek = function() {
		if(typeof $scope.newDate != 'undefined') {
			addWeek(moment($scope.newDate));
		}
	}
	
	$scope.generateTitle = function(week) {
		var beginning = moment(week.week);
		var end = moment(week.week).add(7, 'days');
		return beginning.format('MMMM Do YYYY') + ' - ' + end.format('MMMM Do YYYY');
	}
	
	$scope.back = function() {
		$location.url('/weather');
	}
	
	function addWeek(dateMoment) {
		$location.url('/addWeek/' + dateMoment.day(0).format('YYYY-MM-DD'));
	}
});
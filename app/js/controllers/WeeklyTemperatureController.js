gardenApp.controller('WeeklyTemperatureController', function($scope, $location, $routeParams, TemperatureData) {
	if($routeParams.week != null) {
		TemperatureData.getWeek($routeParams.week)
		.$promise
		.then(function(week) {
			$scope.week = week;
			$scope.removable = true;
			$scope.title = generateTitle();
			
		})
		.catch(function(err) {
			console.log(err);
		});
	} else {
		$scope.week = {
			    "_id" : "-1",
			    "week" : moment($routeParams.newDate).toDate(),
			    "weekFormatted" : moment($routeParams.newDate).format('YYYY-MM-DD'),
			    "minTemp" : 0,
			    "maxTemp" : 0,
			    "avgTemp" : 0
			}
		$scope.removable = false;
		$scope.title = generateTitle();
	}
	
	$scope.saveWeek = function(week, form) {
		if(form.$valid) {
			TemperatureData.saveWeek(week)
			.$promise
			.then(function(response) {
				$scope.backToList();
			})
			.catch(function(err) {
				console.log(err);
				$scope.backToList();
			});
		}
	}
	
	$scope.backToList = function() {
		$location.url('/weeklyTemperatures');
	}
	
	$scope.deleteWeek = function(week) {
		if(confirm('This week will be deleted. This cannot be undone.')) {
			TemperatureData.deleteWeek(week.weekFormatted)
			.$promise
			.then(function(response) {
				$scope.backToList();
			})
			.catch(function(err) {
				console.log(err);
				$scope.backToList();
			});
		}
	}
	
	function generateTitle() {
		var beginning = moment($scope.week.week);
		var end = moment($scope.week.week).add(7, 'days');
		return beginning.format('MMMM Do YYYY') + ' - ' + end.format('MMMM Do YYYY');
	}
});
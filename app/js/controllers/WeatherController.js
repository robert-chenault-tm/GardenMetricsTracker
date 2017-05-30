gardenApp.controller('WeatherController', function($scope, $location) {
	$scope.launchYearlyTemps = function() {
		$location.url('/yearlyTemperatures');
	}
	$scope.launchWeeklyTemps = function() {
		$location.url('/weeklyTemperatures');
	}
	$scope.back = function() {
		$location.url('/');
	}
});
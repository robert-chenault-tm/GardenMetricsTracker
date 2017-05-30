gardenApp.controller('HomeController', function($scope, $location) {
	$scope.launchPlantList = function() {
		$location.url('/plants');
	};
	$scope.launchPlantTypeList = function() {
		$location.url('/plantTypes');
	};
	$scope.launchWeather = function() {
		$location.url('/weather');
	};
	$scope.launchHistory = function() {
		$location.url('/history');
	};
});
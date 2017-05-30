gardenApp.controller('YearlyTemperatureListController', function($scope, $location, TemperatureData) {
	TemperatureData.getAllYears()
		.$promise
		.then(function(years) {
			$scope.years = years;
			$scope.noYears = $scope.years.length < 1;
		})
		.catch(function(err) {
			console.log(err);
		});

	$scope.addYear = function() {
		$location.url('/addYearlyTemperatures');
	}
	
	$scope.back = function() {
		$location.url('/weather');
	}
});
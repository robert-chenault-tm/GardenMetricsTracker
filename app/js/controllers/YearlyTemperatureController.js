gardenApp.controller('YearlyTemperatureController', function($scope, $routeParams, $location, TemperatureData) {
	$scope.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	if($routeParams.year != null) {
		TemperatureData.getYear($routeParams.year)
		.$promise
		.then(function(year) {
			$scope.year = year;
			$scope.existing = true;
		})
		.catch(function(err) {
			console.log(err);
		});
	} else {
		$scope.year = {
			    "_id" : "-1",
			    "year" : "",
			    "monthRanges" : [ 
			        {
			            "month" : 0,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 1,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 2,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 3,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 4,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 5,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 6,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 7,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 8,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 9,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 10,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }, 
			        {
			            "month" : 11,
			            "minViableTemp" : 0,
			            "maxViableTemp" : 0
			        }
			    ]
			};
			$scope.existing = false;
	}
	
	$scope.saveYear = function(year, form) {
		if(form.$valid) {
			TemperatureData.saveYear(year)
			.$promise
			.then(function(response) {
				$location.url('/yearlyTemperatures');
			})
			.catch(function(err) {
				console.log(err);
				$location.url('/yearlyTemperatures');
			});
		}
	};
	
	$scope.backToList = function() {
		$location.url('/yearlyTemperatures');
	};
	
	$scope.deleteYear = function(year) {
		if(confirm('This year\'s temperature data will be deleted. This cannot be undone.')) {
			TemperatureData.deleteYear(year.year)
			.$promise
			.then(function(response) {
				$location.url('/yearlyTemperatures');
			})
			.catch(function(err) {
				console.log(err);
				$location.url('/yearlyTemperatures');
			});
		}
	};
	
});
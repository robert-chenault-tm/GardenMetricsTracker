gardenApp.controller('MetricController', function($scope, $routeParams, $location, MetricData, PlantTypeData) {
	if($routeParams.weekID != null) {
		MetricData.getMetric($routeParams.plantID, $routeParams.weekID)
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
			    "plantID" : $routeParams.plantID,
			    "weekStart" : moment($routeParams.newDate).toDate(),
			    "curWater" : {
			        "amount" : 0,
			        "measurement" : "gallons"
			    },
			    "desiredWater" : {
			        "amount" : 0,
			        "measurement" : "inches of rain"
			    },
			    "pestDamage" : [],
			    "yieldAmount" : 0
			}
		$scope.removable = false;
		$scope.title = generateTitle();
	}
	
	PlantTypeData.getPlantTypeFromPlantID($routeParams.plantID)
		.$promise
		.then(function(plantType) {
			$scope.plantType = plantType;			
		})
		.catch(function(err) {
			console.log(err);
		});
	
	$scope.saveWeek = function(week, form) {
		$scope.week.pestDamage = $scope.week.pestDamage.filter(function(obj) {
			return obj.source != '';
		});
		if(form.$valid) {
			MetricData.saveMetric(week)
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
		$location.url('/plant/' + $routeParams.plantID + '/metrics');
	}
	
	$scope.deleteWeek = function(week) {
		if(confirm('This week will be deleted. This cannot be undone.')) {
			MetricData.deleteMetric(week.plantID, week._id)
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
	
	$scope.addPest = function() {
		$scope.week.pestDamage.push({
			"degree" : 0,
			"source" : ""
		});
	}
	
	$scope.removePest = function(element) {
		var ind = $scope.week.pestDamage.indexOf(element.pest);
		if(ind != -1) {
			$scope.week.pestDamage.splice(ind, 1);
		}
	}
	
	function generateTitle() {
		var beginning = moment($scope.week.weekStart);
		var end = moment($scope.week.weekStart).add(7, 'days');
		return beginning.format('MMMM Do YYYY') + ' - ' + end.format('MMMM Do YYYY');
	}
	
	$scope.measurements = [
		{
			'name': 'gallons'
		},
		{
			'name': 'inches of rain'
		}
	]
	
	$scope.damageValues = [
		{
			'val': 0,
			'description': 'No damage'
		},
		{
			'val': 1,
			'description': 'Minor damage'
		},
		{
			'val': 2,
			'description': 'Moderate damage'
		},
		{
			'val': 3,
			'description': 'Heavy damage'
		}
	]
	
});
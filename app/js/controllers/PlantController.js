gardenApp.controller('PlantController', function($scope, $routeParams, $location, PlantData, PlantTypeData) {
	PlantTypeData.getAllPlantTypes()
	.$promise
	.then(function(plantTypes) {
		var plantTypeNames = plantTypes.map(function(type) {
			return type.name;
		});
		$scope.plantTypes = plantTypes;
		$scope.plantTypeNames = plantTypeNames;
		
	})
	.catch(function(err) {
		console.log(err);
	});
	if($routeParams.plantID != null) {
		PlantData.getPlant($routeParams.plantID)
		.$promise
		.then(function(plant) {
			plant.plantDate = moment(plant.plantDate).toDate();
			$scope.plant = plant;
			$scope.currentType = getSelectedType();
			$scope.removable = true;
			
		})
		.catch(function(err) {
			console.log(err);
		});
	} else {
		$scope.plant = {
				'_id' : -1,
				'plantName' : null,
			    'localID' : '',
			    'plantBreed' : null,
			    'location' : '',
			    'inchRootRadius' : '',
			    'plantDate' : new Date()	
		}
		$scope.currentType = getSelectedType();
		$scope.removable = false;
	}
	
	$scope.applyDefaults = function() {
		if($scope.currentType != null) {
			$scope.plant.inchRootRadius = $scope.currentType.defaultInchRootRadius;
		} else {
			alert('You must select a plant type before applying default values.');
		}
	};
	
	$scope.updateCurrentType = function() {
		$scope.currentType = getSelectedType();
		$scope.plant.plantBreed = $scope.currentType.plantBreeds[0].val;
	};
	
	$scope.savePlant = function(plant, form) {
		if(form.$valid) {
			PlantData.savePlant(plant)
			.$promise
			.then(function(response) {
				$location.url('/plants');
			})
			.catch(function(err) {
				console.log(err);
				$location.url('/plants');
			});
		}
	};
	
	$scope.openWeeklyMetricsList = function() {
		$location.url('/plant/' + $routeParams.plantID + '/metrics');
	};
	
	$scope.backToList = function() {
		$location.url('/plants');
	};
	
	$scope.deletePlant = function(plant) {
		if(confirm('This plant will be deleted. This cannot be undone.')) {
			PlantData.deletePlant(plant._id)
			.$promise
			.then(function(response) {
				$location.url('/plants');
			})
			.catch(function(err) {
				console.log(err);
				$location.url('/plants');
			});
		}
	};
	
	function getSelectedType() {
		if($scope.plant.plantName != null) {
			return $scope.plantTypes.filter(function(type) {
				return type.name == $scope.plant.plantName;
			})[0];
		} else {
			return null;
		}
	}
});
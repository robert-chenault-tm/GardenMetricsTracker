gardenApp.controller('PlantTypeController', function($scope, $routeParams, $location, PlantTypeData) {
	if($routeParams.plantTypeID != null) {
		PlantTypeData.getPlantType($routeParams.plantTypeID)
		.$promise
		.then(function(plantType) {
			$scope.plantType = plantType;
			$scope.removable = true;
		})
		.catch(function(err) {
			console.log(err);
		});
	} else {
		$scope.plantType = {
			'_id' : '-1',
			'name' : '',
			'defaultMeasurement' : '',
			'defaultInchRootRadius' : '',
			'plantBreeds' : [{ 'val' : ''}]
		};
		$scope.removable = false;
	}
	
	$scope.removeBreed = function(element) {
		if($scope.plantType.plantBreeds.length > 1) {
			var breeds = $scope.plantType.plantBreeds
			var ind = breeds.indexOf(element.breed);
			if(ind == 0) {
				breeds.shift();
			} else if(ind == breeds.length - 1) {
				breeds.pop();
			} else {
				breeds.splice(ind, 1)
			}
		} else {
			alert('You must have at least one plant breed entry.');
		}
	};
	
	$scope.newBreed = function() {
		$scope.plantType.plantBreeds.push({'val': ''});
	};
	
	$scope.savePlantType = function(plantType, form) {
		var culledBreeds = $scope.plantType.plantBreeds.filter(function(breed) {
			return breed.val != '';
		});
		if(form.$valid && culledBreeds.length > 0) {
			$scope.plantType.plantBreeds = culledBreeds;
			PlantTypeData.savePlantType(plantType);
			$location.url('/plantTypes');
		}
	};
	
	$scope.backToList = function() {
		$location.url('/plantTypes');
	};
	
	$scope.deletePlantType = function(plantType) {
		if(confirm('This plant type will be deleted. This cannot be undone.')) {
			PlantTypeData.deletePlantType(plantType._id);
			$location.url('/plantTypes');
		}
	};
});
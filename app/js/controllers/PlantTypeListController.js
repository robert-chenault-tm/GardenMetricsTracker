gardenApp.controller('PlantTypeListController', function($scope, $location, PlantTypeData) {
	PlantTypeData.getAllPlantTypes()
		.$promise
		.then(function(plantTypes) {
			$scope.plantTypes = plantTypes;
		})
		.catch(function(err) {
			console.log(err);
		});
	
	$scope.addPlantType = function() {
		$location.url('/addPlantType');
	}
	
	$scope.toHome = function() {
		$location.url('/');
	}
});
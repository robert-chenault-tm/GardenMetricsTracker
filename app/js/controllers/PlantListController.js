gardenApp.controller('PlantListController', function($scope, $location, PlantData) {
	PlantData.getAllPlants()
		.$promise
		.then(function(plants) {
			$scope.plants = plants;
			$scope.noPlants = $scope.plants.length < 1;
		})
		.catch(function(err) {
			console.log(err);
		});
	
	$scope.addPlant = function() {
		$location.url('/addPlant');
	}
	
	$scope.toHome = function() {
		$location.url('/');
	}
});
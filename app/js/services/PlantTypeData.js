gardenApp.factory('PlantTypeData', function($resource) {
	var resource = $resource('/data/plantType/:_id', { _id: '@_id'});
	var resource2 = $resource('/data/plantTypeFromPlant/:_id', { _id: '@_id'});
	
	return {
		getPlantType: function(id) {
			return resource.get({_id: id});
		},
		getAllPlantTypes: function() {
			return resource.query();
		},
		savePlantType: function(plant) {
			return resource.save(plant);
		},
		deletePlantType: function(id) {
			return resource.remove({_id: id});
		},
		getPlantTypeFromPlantID: function(id) {
			return resource2.get({_id: id});
		}
	};
});
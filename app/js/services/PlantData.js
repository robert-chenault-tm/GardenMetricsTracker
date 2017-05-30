gardenApp.factory('PlantData', function($resource) {
	var resource = $resource('/data/plant/:_id', { _id: '@_id'});
	
	return {
		getPlant: function(id) {
			return resource.get({_id: id});
		},
		getAllPlants: function() {
			return resource.query();
		},
		savePlant: function(plant) {
			return resource.save(plant);
		},
		deletePlant: function(id) {
			return resource.remove({_id: id});
		}
	};
});
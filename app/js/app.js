var gardenApp = angular.module('gardenApp', ['ngResource', 'ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/Home.html',
			controller: 'HomeController'
		});
		$routeProvider.when('/plants', {
			templateUrl: 'templates/PlantList.html',
			controller: 'PlantListController'
		});
		$routeProvider.when('/plantTypes', {
			templateUrl: 'templates/PlantTypeList.html',
			controller: 'PlantTypeListController'
		});
		$routeProvider.when('/history', {
			templateUrl: 'templates/History.html',
			controller: 'HistoryController'
		});
		$routeProvider.when('/plant/:plantID', {
			templateUrl: 'templates/Plant.html',
			controller: 'PlantController'
		});
		$routeProvider.when('/addPlant', {
			templateUrl: 'templates/Plant.html',
			controller: 'PlantController'
		});
		$routeProvider.when('/plantType/:plantTypeID', {
			templateUrl: 'templates/PlantType.html',
			controller: 'PlantTypeController'
		});
		$routeProvider.when('/addPlantType', {
			templateUrl: 'templates/PlantType.html',
			controller: 'PlantTypeController'
		});
		$routeProvider.when('/yearlyTemperatures', {
			templateUrl: 'templates/YearlyTemperatureList.html',
			controller: 'YearlyTemperatureListController'
		});
		$routeProvider.when('/yearlyTemperature/:year', {
			templateUrl: 'templates/YearlyTemperature.html',
			controller: 'YearlyTemperatureController'
		});
		$routeProvider.when('/addYearlyTemperatures', {
			templateUrl: 'templates/YearlyTemperature.html',
			controller: 'YearlyTemperatureController'
		});
		$routeProvider.when('/plant/:plantID/metrics', {
			templateUrl: 'templates/MetricsList.html',
			controller: 'MetricsListController'
		});
		$routeProvider.when('/plant/:plantID/metric/:weekID', {
			templateUrl: 'templates/Metric.html',
			controller: 'MetricController'
		});
		$routeProvider.when('/plant/:plantID/addMetric/:newDate', {
			templateUrl: 'templates/Metric.html',
			controller: 'MetricController'
		});
		$routeProvider.when('/weather', {
			templateUrl: 'templates/Weather.html',
			controller: 'WeatherController'
		});
		$routeProvider.when('/weeklyTemperatures', {
			templateUrl: 'templates/WeeklyTemperatureList.html',
			controller: 'WeeklyTemperatureListController'
		});
		$routeProvider.when('/weeklyTemperature/:week', {
			templateUrl: 'templates/WeeklyTemperature.html',
			controller: 'WeeklyTemperatureController'
		});
		$routeProvider.when('/addWeek/:newDate', {
			templateUrl: 'templates/WeeklyTemperature.html',
			controller: 'WeeklyTemperatureController'
		});
		$routeProvider.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
});
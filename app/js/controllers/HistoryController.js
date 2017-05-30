gardenApp.controller('HistoryController', function($scope, $location, TemperatureData) {
	var charts = [];
	$scope.canvasList = [
		{
			"id" : "canvas1"
		}
	]
	
	$scope.lowerDateBound = moment("2015-01-01", "YYYY-MM-DD");
	$scope.upperDateBound = moment("2019-01-01", "YYYY-MM-DD");
	
	$(document).ready(function() {
		init();
	});
	
	function init() {
		TemperatureData.getAllWeeks()
			.$promise
			.then(function(weeks) {
				$scope.temperatures = weeks.filter(function(week) {
					var date = moment(week.week);
					if(date.isBefore($scope.lowerDateBound) || date.isAfter($scope.upperDateBound)) {
						return false;
					} else {
						return true;
					}
				});
				TemperatureData.getAllYears()
					.$promise
					.then(function(years) {
						years = years.filter(function(year) {
							if(year.year < $scope.lowerDateBound.year() || year.year > $scope.upperDateBound.year()) {
								return false;
							} else {
								return true;
							}
						});
						$scope.temperatures = $scope.temperatures.map(function(week) {
							var curWeek = moment(week.week);
							var month = curWeek.month(); 
							var year = curWeek.year();
							var selectedYear = years.filter(function(obj) {
								return obj.year == year;
							})[0];
							var selectedMonth = selectedYear.monthRanges.filter(function(obj) {
								return obj.month == month;
							})[0];
							week.minViableTemp = selectedMonth.minViableTemp;
							week.maxViableTemp = selectedMonth.maxViableTemp;
							return week;
						});
						console.log($scope.temperatures.length);
						$scope.temperatures.sort(function(a, b) {
							momentA = moment(a.week);
							momentB = moment(b.week);
							if(momentA.isBefore(momentB)) {
								return -1;
							} else {
								return 1;
							}
						});
						if($scope.temperatures.length > 0) {
							createTemperatureGraph();
						}
					}).catch(function(err) {
						console.log(err);
					});
			}).catch(function(err) {
				console.log(err);
			});
	}
	
	function createTemperatureGraph() {
		var labels = [];
		var datasets = [];
		var minViableData = [];
		var maxViableData = [];
		var minData = [];
		var maxData = [];
		var avgData = [];
		$.each($scope.temperatures, function(index, value) {
			labels.push(value.weekFormatted);
			minViableData.push(value.minViableTemp);
			maxViableData.push(value.maxViableTemp);
			minData.push(value.minTemp);
			maxData.push(value.maxTemp);
			avgData.push(value.avgTemp);
		});
		datasets.push({
			label: "Min Viable temp",
			borderColor: "rgba(0,0,255,0.8)",
			backgroundColor: "rgba(0,0,255,0.8)",
			fill: false,
            data: minViableData
		});
		datasets.push({
			label: "Max Viable temp",
			borderColor: "rgba(255,0,0,0.8)",
			backgroundColor: "rgba(255,0,0,0.8)",
			fill: false,
            data: maxViableData
		});
		datasets.push({
			label: "Min temp",
			borderColor: "rgba(0,0,255,0.4)",
			backgroundColor: "rgba(0,0,255,0.4)",
			fill: false,
            data: minData
		});
		datasets.push({
			label: "Max temp",
			borderColor: "rgba(255,0,0,0.4)",
			backgroundColor: "rgba(255,0,0,0.4)",
			fill: false,
            data: maxData
		});
		datasets.push({
			label: "Avg temp",
			borderColor: "rgba(128,128,128,1)",
			backgroundColor: "rgba(128,128,128,1)",
			fill: false,
            data: avgData
		});
		var ctx = $('#' + $scope.canvasList[0].id);
		charts.push(new Chart(ctx, {
			type: 'line',
		    data: {
		    	labels: labels,
		    	datasets: datasets
		    },
		    options: {
		    	maintainAspectRatio: false,
		    	responsive: false
		    }
		}));
	}
});
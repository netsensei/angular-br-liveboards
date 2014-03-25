'use strict';

angular.module('ui-nmbs-liveboards', ['irailApiServices'])
  .directive('nmbsLiveboards', ['Nmbs', function(Nmbs) {
    return {
      restrict: 'A',
      template: '<div class="nmbsLiveboards">' +
                   '<div ng-if="!station" class="selectStation">' +
                     '<p>Select a station</p>' +
                     '<select ng-model="selectedStation" ng-options="s.name for s in stations"></select>' +
                   '</div>' +
                 '</div>',
      scope: {
        station: '='
      },
      link: function(scope, element, attrs) {
        scope.stations = [];

        Nmbs.getStations().then(function (data) {
          scope.stations = data.Stations;
        });

      }
    };
  }]);

var irailApiServices = angular.module('irailApiServices', ['ngResource']);

irailApiServices.service('Nmbs', function ($http) {
  this.getStations = function () {
    return this.getData('https://data.irail.be/NMBS/Stations.json');
  };

  this.getLiveboard = function (station) {
    return this.getData(station.departures);
  };

  this.getData = function (url) {
    var promise = $http.get(url).then(function (response) {
      return response.data;
    });

    return promise;
  };
});

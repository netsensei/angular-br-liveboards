'use strict';

angular.module('ui-nmbs-liveboards', ['irailApiServices'])
  .directive('nmbsLiveboards', ['Nmbs', function(Nmbs) {
    return {
      restrict: 'A',
      template: '<div class="nmbsLiveboards">' +
                   '<div class="selectStation">' +
                     '<p>Select a station</p>' +
                     '<select ng-model="station" ng-options="s.name for s in stations"></select>' +
                   '</div>' +
                 '</div>',
      scope: {
        station: '='
      },
      link: function(scope, element, attrs) {
        Nmbs.getStations(function(data) {
          scope.stations = data.Stations;
        });
      }
    };
  }]);

var irailApiServices = angular.module('irailApiServices', ['ngResource']);

irailApiServices.factory('Nmbs', ['$resource',
  function ($resource) {
      return $resource('https://data.irail.be/NMBS/Stations.json', {}, {
        getStations: { method: 'GET', isArray: false}
      });
    }]);

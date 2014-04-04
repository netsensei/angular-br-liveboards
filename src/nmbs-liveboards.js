'use strict';

angular.module('ui-nmbs-liveboards', ['irailApiServices', 'NmbsFilters'])
  .directive('nmbsLiveboards', ['Nmbs', function(Nmbs) {
    return {
      restrict: 'A',
      template: '<div class="nmbsLiveboards">' +
                   '<div ng-if="!selectedStation" class="selectStation">' +
                     '<p>Select a station</p>' +
                     '<select ng-model="selectedStation" ng-options="s.name for s in stations" ng-change="update(selectedStation)"></select>' +
                   '</div>' +
                   '<div ng-if="showLoader" class="loader"></div>' +
                   '<div ng-if="received" class="liveBoard">' +
                     '<div class="stationData">' +
                       '<h1>{{liveBoard.location.name}}</h1>' +
                     '</div>' +
                     '<table class="departures">' +
                       '<thead>' +
                         '<tr><th colspan="5">test</th></tr>' +
                       '</thead>' +
                       '<tbody>' +
                         '<tr class="departure" ng-repeat="departure in liveBoard.departures">' +
                           '<td class="time">{{departure.iso8601 | timeFilter}}</td>' +
                           '<td class="direction">{{departure.direction}}</td>' +
                           '<td class="type">{{departure.vehicle | vehicleTypeFilter}}</td>' +
                           '<td class="platform">{{departure.platform.name}}</td>' +
                           '<td ng-if="departure.delay" class="delay">+{{departure.delay | delayFilter}}</td>' +
                          '</tr>' +
                       '</tbody>' +
                     '</table>' +
                   '</div>' +
                 '</div>' +
                 '{{foobar.value}}',
      scope: {
        station: '='
      },
      controller: function($scope, $element) {
        $scope.selectedStation = (!angular.isUndefined($scope.station)) ? true : false;
        $scope.activeStation = false;
        $scope.liveBoard = [];
        $scope.received = false;
        $scope.showLoader = false;

        Nmbs.getStations().then(function (data) {
          $scope.stations = data.Stations;
          if (!angular.isUndefined($scope.station)) {
            for (var idx = 0; idx < data.Stations.length; ++idx) {
              if (data.Stations[idx].name === $scope.station) {
                $scope.activeStation = data.Stations[idx];
                break;
              }
            }
            $scope.update($scope.activeStation);
          }
        });

        $scope.update = function (selectedStation) {
          $scope.selectedStation = selectedStation;
          $scope.showLoader = true;
          Nmbs.getLiveboard(selectedStation).then(function (data) {
            $scope.liveBoard = data.Liveboard;
            $scope.received = true;
          });
        };

        $scope.$watch('received', function (received) {
          console.log('test');
          console.log(received);
          if (received) {
            $scope.showLoader = false;
          }
        });
      }
    };
  }]);

// The iRail API service
angular.module('irailApiServices', []).service('Nmbs', ['$http', function ($http) {
  this.getStations = function () {
    return this.getData('https://data.irail.be/NMBS/Stations.json');
  };

  this.getLiveboard = function (station) {
    return this.getData(station.departures + '.json');
  };

  this.getData = function (url) {
    var promise = $http.get(url).then(function (response) {
      return response.data;
    });

    return promise;
  };
}]);

// Filters
angular.module('NmbsFilters', [])
  .filter('vehicleTypeFilter', function () {
    return function(vehicle) {
      var parts = vehicle.split('.');
      return parts[2].replace(/(\d+)/g, '');
    };
  })
  .filter('timeFilter', function () {
    return function(time) {
      var dateObj = new Date(time);
      return dateObj.toLocaleTimeString("be-BE");
    };
  })
  .filter('delayFilter', function () {
    return function(time) {
      var hours = parseInt( time / 3600, 10) % 24;
      var minutes = parseInt( time / 60, 10) % 60;
      return (hours < 10 ? "0" + hours : hours) + "h" + (minutes < 10 ? "0" + minutes : minutes);
    };
  });

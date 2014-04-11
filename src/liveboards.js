'use strict';

angular.module('br.liveboards', ['brLiveboardsFilters'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('loadingStatusInterceptor');
  })

  .directive('brLiveboards', ['$http', function($http) {
    return {
      restrict: 'A',
      template: '<div class="brLiveboards">' +
                   '<div ng-if="!selectedStation" class="selectStation">' +
                     '<p ng-if="stations">Select a station</p>' +
                     '<select ng-if="stations" ng-model="selectedStation" ng-options="s.name for s in stations" ng-change="update(selectedStation)"></select>' +
                   '</div>' +
                   '<div ng-if="showLoader" class="loader"></div>' +
                   '<div ng-if="errorMessage" class="error">{{errorMessage}}</div>' +
                   '<div ng-if="liveBoard" class="liveBoard">' +
                     '<div class="stationData">' +
                       '<h1>{{liveBoard.location.name}}</h1>' +
                     '</div>' +
                     '<table class="departures">' +
                       '<thead>' +
                         '<tr><th colspan="5">{{now}}</th></tr>' +
                       '</thead>' +
                       '<tbody>' +
                         '<tr class="departure" ng-repeat="departure in liveBoard.departures">' +
                           '<td class="time">{{departure.time | timeFilter}}</td>' +
                           '<td class="direction">{{departure.direction}}</td>' +
                           '<td class="type">{{departure.vehicle | vehicleTypeFilter}}</td>' +
                           '<td class="platform">{{departure.platform.name}}</td>' +
                           '<td ng-if="!departure.delay" class="delay">&nbsp;</td>' +
                           '<td ng-if="departure.delay" class="delay">+{{departure.delay | delayFilter}}</td>' +
                          '</tr>' +
                       '</tbody>' +
                     '</table>' +
                   '</div>' +
                 '</div>' +
                 '{{foobar.value}}',
      scope: {
        station: '=',
      },
      controller: function($scope, $element) {
        $scope.selectedStation = (!angular.isUndefined($scope.station)) ? true : false;
        $scope.activeStation = false;
        $scope.liveBoard = null;
        $scope.showLoader = false;
        $scope.errorMessage = '';
        $scope.now = new Date().toLocaleTimeString("be-BE").replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        $scope.$on('loadingStatusActive', function() {
          $scope.showLoader = true;
        });

        $scope.$on('loadingStatusInactive', function () {
          $scope.showLoader = false;
        });

        $http.get('https://data.irail.be/NMBS/Stations.json')
          .success(function (data) {
            $scope.stations = data.Stations;

            if (!angular.isUndefined($scope.station)) {
              var found = false;

              for (var idx = 0; idx < data.Stations.length; ++idx) {
                if (data.Stations[idx].name === $scope.station) {
                  $scope.update(data.Stations[idx]);
                  found = true;
                  break;
                }
              }

              if (!found) {
                $scope.errorMessage = "The selected station does not exist";
              }
            }
          })
          .error(function(data, status, headers, config) {
            switch (status) {
              case 0:
                $scope.errorMessage = "The network connection appears to be unavaiable.";
            }
        });

        $scope.update = function (selectedStation) {
          $scope.selectedStation = selectedStation;
          $scope.showLoader = true;
          $http.get(selectedStation.departures + '.json')
            .success(function (data) {
              data.Liveboard.departures = data.Liveboard.departures.slice(0, 20);
              $scope.liveBoard = data.Liveboard;
            })
            .error(function(data, status, headers, config) {
              switch (status) {
                case 0:
                  $scope.errorMessage = "The network connection appears to be unavaiable.";
              }
            });
        };
      }
    };
  }])

  // The loadingStatusInterceptor broadcasts an event. We use this to notify
  // the controller when the spinner should be hidden/shown.
  .factory('loadingStatusInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
    var activeRequests = 0;

    var started = function() {
      if (activeRequests === 0) {
        $rootScope.$broadcast('loadingStatusActive');
      }
      activeRequests++;
    };

    var ended = function() {
      activeRequests--;
      if (activeRequests === 0) {
        $rootScope.$broadcast('loadingStatusInactive');
      }
    };

    return {
      request: function(config) {
        started();
        return config || $q.when(config);
      },
      response: function(response) {
        ended();
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        ended();
        return $q.reject(rejection);
      }
    };
  }]);

// Filters
angular.module('brLiveboardsFilters', [])
  .filter('vehicleTypeFilter', function () {
    return function(vehicle) {
      var parts = vehicle.split('.');
      return parts[2].replace(/(\d+)/g, '');
    };
  })
  .filter('timeFilter', function () {
    return function(time) {
      var dateObj = new Date(time * 1000);
      return dateObj.toLocaleTimeString("be-BE").replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    };
  })
  .filter('delayFilter', function () {
    return function(time) {
      var hours = parseInt( time / 3600, 10) % 24;
      var minutes = parseInt( time / 60, 10) % 60;
      return (hours < 10 ? "0" + hours : hours) + "h" + (minutes < 10 ? "0" + minutes : minutes);
    };
  });

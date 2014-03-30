describe("NMBS Liveboards", function() {

  var scope, $compile;
  var element;

  beforeEach(module('ui-nmbs-liveboards'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope;
    $compile = _$compile_;
  }));

  var createLiveboard = function (tpl) {
    if (!tpl) tpl = '<div nmbs-liveboards>';
    element = angular.element(tpl);
    element = $compile(element)(scope);
    scope.$digest();
  }

  describe('Uninitialized Liveboard', function() {

    beforeEach(function () {
      inject(function ($httpBackend) {
        $httpBackend.whenGET('https://data.irail.be/NMBS/Stations.json').respond({
          "Stations":[{
            "id":"BE.NMBS.00101",
            "name":"Simonis",
            "longitude":
            "4.330556",
            "latitude":
            "50.863056","departures":"https:\/\/data.iRail.be\/NMBS\/Liveboard\/Simonis\/2014\/03\/30\/19\/20"
          }]
        });
        createLiveboard();
        $httpBackend.flush();
      });
    });

    it('should render a select element with stations', function() {
      expect(element.find('select').hasClass('ng-pristine ng-valid')).toBeTruthy();
      expect(element.find('option')).toBeTruthy();
    });

    it('should not render a loader upon initialization', function() {
      var elements = element.find('div');
      for (var idx = 0; idx < elements.length; ++idx) {
        expect(angular.element(elements[idx]).hasClass('loader')).toBeFalsy();
      }
    });
  });

  describe('Initialized Liveboard', function() {

  var createLiveboard = function (tpl) {
    if (!tpl) tpl = '<div nmbs-liveboards>';
    element = angular.element(tpl);
    element = $compile(element)(scope);
    scope.$digest();
  }

    beforeEach(function () {
      inject(function ($httpBackend) {
        $httpBackend.whenGET('https://data.irail.be/NMBS/Stations.json').respond({
          "Stations":[{
            "id":"BE.NMBS.00101",
            "name":"Simonis",
            "longitude":"4.330556",
            "latitude":"50.863056",
            "departures":"https:\/\/data.iRail.be\/NMBS\/Liveboard\/Simonis\/2014\/03\/30\/19\/20"
          }]
        });

        $httpBackend.whenGET('https://data.iRail.be/NMBS/Liveboard/Simonis/2014/03/30/19/20.json').respond({
          "Liveboard":{
            "location":{
              "name":"Simonis",
              "longitude":4.32898,
              "latitude":50.863645},
              "departures":[{
                "time":1396237380,
                "iso8601":"2014-03-31T05:43:00+0200",
                "delay":0,
                "direction":
                "Brussel-Zuid",
                "vehicle":"BE.NMBS.L5325",
                "platform":{"name":""}
              }]
            }
        });

        var board = '<div nmbs-liveboards station=\"\'Simonis\'\">';
        createLiveboard(board);
        $httpBackend.flush();
      });
    });

    it('should render a select element with stations', function() {
      console.log(element);
    });

  });
});

describe('NMBS Liveboards iRail API test', function() {

})

describe("NMBS Liveboards", function() {

  var scope, $compile;
  var element;

  beforeEach(module('ui-nmbs-liveboards'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope;
    $compile = _$compile_;
  }));

  describe('Uninitialized Liveboard', function() {
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
      expect(element.find('div.nmbsLiveboards div.loader')).not.toBeDefined();
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
                "delay":300,
                "direction":"Brussel-Zuid",
                "vehicle":"BE.NMBS.L5325",
                "platform":{"name":"2"}
              }]
            }
        });

        var board = '<div nmbs-liveboards station=\"\'Simonis\'\">';
        createLiveboard(board);
        $httpBackend.flush();
      });
    });

    it('should show a liveboard if one is found', function() {
      expect(element.find('div.stationData h1').text()).toMatch('Simonis');
      expect(element.find('div.stationData tr.departure')).toBeDefined();
    });

    it('should show a valid departure record if one is found', function() {
      // expect valid time
      expect(element.find('tr.departure td.direction').text()).toMatch('Brussel-Zuid');
      expect(element.find('tr.departure td.type').text()).toMatch('L');
      expect(element.find('tr.departure td.platform').text()).toMatch('2');
      expect(element.find('tr.departure td.delay').text()).toMatch(/\+00h05/);
    });

    it('should show a human readable error message if no liveboard could be loaded', function() {
    });
  });
});

describe('NMBS Liveboards iRail API test', function() {

});

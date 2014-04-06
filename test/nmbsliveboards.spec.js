describe("NMBS Liveboards", function() {

  var scope, $compile;
  var element;

  var stations = {
    "Stations":[{
      "id": "BE.NMBS.00101",
      "name": "Simonis",
      "longitude": "4.330556",
      "latitude": "50.863056",
      "departures": "https:\/\/data.iRail.be\/NMBS\/Liveboard\/Simonis\/2014\/03\/30\/19\/20"
    }]
  };

  var station = {
    "Liveboard":{
      "location":{
        "name":"Simonis",
        "longitude":4.32898,
        "latitude":50.863645
      },
      "departures":[{
        "time":1396237380,
        "iso8601":"2014-03-31T05:43:00+0200",
        "delay":300,
        "direction":"Brussel-Zuid",
        "vehicle":"BE.NMBS.L5325",
        "platform":{"name":"2"}
      }]
    }
  };

  beforeEach(module('ui-nmbs-liveboards'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope;
    $compile = _$compile_;
  }));

  describe('Uninitialized Liveboard', function() {

    var createLiveboard = function (tpl) {
      if (!tpl) { tpl = '<div nmbs-liveboards>'; }
      element = angular.element(tpl);
      element = $compile(element)(scope);
      scope.$digest();
    };

    beforeEach(function () {
      inject(function ($httpBackend) {
        $httpBackend.whenGET('https://data.irail.be/NMBS/Stations.json').respond(stations);
        createLiveboard();
        $httpBackend.flush();
      });
    });

    it('should render a select element with stations', function() {
      expect(element.find('select').hasClass('ng-pristine ng-valid')).toBeTruthy();
      expect(element.find('select').children().length).toBe(2);
    });

    it('should not render a loader upon initialization', function() {
      expect(element.find('div.nmbsLiveboards div.loader').length).toBe(0);
    });

  });

  describe('Initialized Liveboard with retrievable data', function() {

    var createLiveboard = function (tpl) {
      if (!tpl) { tpl = '<div nmbs-liveboards station="\'Simonis\'">'; }
      element = angular.element(tpl);
      element = $compile(element)(scope);
      scope.$digest();
    };

    beforeEach(function () {
      inject(function ($httpBackend) {
        $httpBackend.whenGET('https://data.irail.be/NMBS/Stations.json').respond(stations);
        $httpBackend.whenGET('https://data.iRail.be/NMBS/Liveboard/Simonis/2014/03/30/19/20.json').respond(station);

        var board = '<div nmbs-liveboards station=\"\'Simonis\'\">';
        createLiveboard(board);
        $httpBackend.flush();
      });
    });

    it('should show a liveboard if one is found', function() {
      expect(element.find('div.liveBoard').length).toBe(1);
      expect(element.find('div.stationData h1').text()).toMatch('Simonis');
      expect(element.find('div.stationData tr.departure')).toBeDefined();
    });

    it('should show a valid departure record if one is found', function() {
      // expect valid time
      expect(element.find('tr.departure td.direction').text()).toMatch(/^Brussel-Zuid$/);
      expect(element.find('tr.departure td.type').text()).toMatch(/^L$/);
      expect(element.find('tr.departure td.platform').text()).toMatch(/^2$/);
      expect(element.find('tr.departure td.delay').text()).toMatch(/^\+00h05$/);
    });

    it('should not render a loader upon initialization', function() {
      expect(element.find('div.nmbsLiveboards div.loader').length).toBe(0);
    });

    it('should not show an error if the liveboard could be retrieved', function() {
      expect(element.find('div.error').length).toBe(0);
    });

  });

  describe('Initialized Liveboard with unretrievable data', function() {

    var createLiveboard = function (tpl) {
      if (!tpl) { tpl = '<div nmbs-liveboards station="\'Simonis\'">'; }
      element = angular.element(tpl);
      element = $compile(element)(scope);
      scope.$digest();
    };

    beforeEach(function () {
      inject(function ($httpBackend) {
        $httpBackend.whenGET('https://data.irail.be/NMBS/Stations.json').respond(stations);
        $httpBackend.whenGET('https://data.iRail.be/NMBS/Liveboard/undefined/2014/03/30/19/20.json').respond('Unable to get results');

        var board = '<div nmbs-liveboards station=\"\'undefined\'\">';
        createLiveboard(board);
        $httpBackend.flush();
      });
    });

    it('should show an error if the liveboard could not be retrieved', function() {
      expect(element.find('div.error').text()).toMatch("The selected station does not exist");
      expect(element.find('div.liveBoard').length).toBe(0);
    });

  });

});

describe("NMBS Liveboard select a station", function() {

  var nmbsLiveboardsCtrl;

  beforeEach(angular.mock.module('App'));

  beforEach(angular.mock.inject(function($controller) {
    nmbsLiveboardsCtrl = $controller('nmbsLiveboardsCtrl')
  }));

  it('should have a nmbsLiveboardsCtrl controller', function() {
    expect(App.nmbsLiveboardsCtrl).toBeDefined();
  });
});

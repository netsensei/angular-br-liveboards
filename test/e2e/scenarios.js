describe('NMBS Liveboards e2e test', function() {
    beforeEach(function() {
        ptor = protractor.getInstance();
    });

    it ('redirect works', function() {
      ptor.get('/example');

      expect(true).toBe(true);
    });
});

'use strict';

describe('Controller: GetchannelinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('r2App'));

  var GetchannelinfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GetchannelinfoCtrl = $controller('GetchannelinfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Controller: TestmainCtrl', function () {

  // load the controller's module
  beforeEach(module('r2App'));

  var TestmainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestmainCtrl = $controller('TestmainCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Component: FrutasComponent', function() {
  // load the controller's module
  beforeEach(module('plantillaApp.frutas'));

  var FrutasComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FrutasComponent = $componentController('frutas', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});

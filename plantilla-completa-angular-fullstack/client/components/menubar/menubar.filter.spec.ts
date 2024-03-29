'use strict';

describe('Filter: keyboardShortcut', function() {
  // load the filter's module
  beforeEach(module('directives.menubar'));

  // initialize a new instance of the filter before each test
  var keyboardShortcut;
  beforeEach(inject(function($filter) {
    keyboardShortcut = $filter('keyboardShortcut');
  }));

  it('should return the input prefixed with "keyboardShortcut filter:"', function() {
    var text = 'angularjs';
    expect(keyboardShortcut(text)).to.equal('keyboardShortcut filter: ' + text);
  });
});

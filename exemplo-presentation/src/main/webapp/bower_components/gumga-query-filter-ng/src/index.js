
  'use strict';

  require('./factory/index.js')
  require('./query/query.js')
  require('./filter/index.js')
  
  angular.module('gumga.queryfilter', ['gumga.queryfilter.query','gumga.queryfilter.filter','gumga.queryfilter.factory']);


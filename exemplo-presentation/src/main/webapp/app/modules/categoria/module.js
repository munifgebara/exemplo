define(function(require) {

  var APILocation = require('app/apiLocations');
  require('angular-ui-router');
  require('app/modules/categoria/services/module');
  require('app/modules/categoria/controllers/module');

  return require('angular')
    .module('app.categoria', [
      'ui.router',
      'app.categoria.controllers',
      'app.categoria.services',
      'gumga.core'
    ])
    .config(function($stateProvider, $httpProvider) {
      $stateProvider
        .state('categoria.list', {
          url: '/list',
          templateUrl: 'app/modules/categoria/views/list.html',
          controller: 'CategoriaListController'
        })
        .state('categoria.insert', {
          url: '/insert',
          templateUrl: 'app/modules/categoria/views/form.html',
          controller: 'CategoriaFormController',
          resolve: {
            entity: ['$stateParams', '$http', function($stateParams, $http) {
              return $http.get(APILocation.apiLocation + '/api/categoria/new');
            }]
          }
        })
        .state('categoria.edit', {
          url: '/edit/:id',
          templateUrl: 'app/modules/categoria/views/form.html',
          controller: 'CategoriaFormController',
          resolve: {
            entity: ['$stateParams', '$http', function($stateParams, $http) {
              return $http.get(APILocation.apiLocation + '/api/categoria/' + $stateParams.id);
            }]
          }
        });
    })
});
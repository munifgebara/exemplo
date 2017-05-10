define(function(require) {

  var APILocation = require('app/apiLocations');
  require('angular-ui-router');
  require('app/modules/grupo/services/module');
  require('app/modules/grupo/controllers/module');

  return require('angular')
    .module('app.grupo', [
      'ui.router',
      'app.grupo.controllers',
      'app.grupo.services',
      'gumga.core'
    ])
    .config(function($stateProvider, $httpProvider) {
      $stateProvider
        .state('grupo.list', {
          url: '/list',
          templateUrl: 'app/modules/grupo/views/list.html',
          controller: 'GrupoListController'
        })
        .state('grupo.insert', {
          url: '/insert',
          templateUrl: 'app/modules/grupo/views/form.html',
          controller: 'GrupoFormController',
          resolve: {
            entity: ['$stateParams', '$http', function($stateParams, $http) {
              return $http.get(APILocation.apiLocation + '/api/grupo/new');
            }]
          }
        })
        .state('grupo.edit', {
          url: '/edit/:id',
          templateUrl: 'app/modules/grupo/views/form.html',
          controller: 'GrupoFormController',
          resolve: {
            entity: ['$stateParams', '$http', function($stateParams, $http) {
              return $http.get(APILocation.apiLocation + '/api/grupo/' + $stateParams.id);
            }]
          }
        });
    })
});
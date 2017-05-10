define(function (require) {
    var angular = require('angular');
    require('app/modules/categoria/services/module');
    require('angular-ui-router');

    return angular
            .module('app.categoria.controllers', ['app.categoria.services','ui.router'])
            .controller('CategoriaFormController', require('app/modules/categoria/controllers/CategoriaFormController'))
            .controller('CategoriaListController', require('app/modules/categoria/controllers/CategoriaListController'));
});
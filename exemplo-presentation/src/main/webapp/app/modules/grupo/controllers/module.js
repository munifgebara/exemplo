define(function (require) {
    var angular = require('angular');
    require('app/modules/grupo/services/module');
    require('angular-ui-router');

    return angular
            .module('app.grupo.controllers', ['app.grupo.services','ui.router'])
            .controller('GrupoFormController', require('app/modules/grupo/controllers/GrupoFormController'))
            .controller('GrupoListController', require('app/modules/grupo/controllers/GrupoListController'));
});
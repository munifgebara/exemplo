define(function (require) {
    var angular = require('angular');
    require('app/modules/pedido/services/module');
    require('angular-ui-router');

    return angular
            .module('app.pedido.controllers', ['app.pedido.services','ui.router'])
            .controller('ModalItemPedidoController', require('app/modules/pedido/controllers/ModalItemPedidoController'))
            .controller('PedidoFormController', require('app/modules/pedido/controllers/PedidoFormController'))
            .controller('PedidoListController', require('app/modules/pedido/controllers/PedidoListController'));
});
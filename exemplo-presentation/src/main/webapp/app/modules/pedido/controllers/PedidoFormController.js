define([], function () {


	PedidoFormController.$inject = ['PedidoService', '$state', 'entity', '$scope', 'gumgaController'];

	function PedidoFormController(PedidoService, $state, entity, $scope, gumgaController) {

		gumgaController.createRestMethods($scope, PedidoService, 'pedido');

		$scope.pedido.data = entity.data || {};
		$scope.pedido.data.itens = $scope.pedido.data.itens || [];
		$scope.continue = {};

		$scope.pedido.on('putSuccess', function (data) {
			$state.go('pedido.list');
		});
	}

	return PedidoFormController;
});
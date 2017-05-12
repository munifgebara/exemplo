define([], function() {


 	ProdutoFormController.$inject = ['ProdutoService', '$state', 'entity', '$scope', 'gumgaController', 'CategoriaService'];

 	function ProdutoFormController(ProdutoService, $state, entity, $scope, gumgaController, CategoriaService) {

    	gumgaController.createRestMethods($scope, ProdutoService, 'produto');


	    gumgaController.createRestMethods($scope, CategoriaService, 'categoria');
	    $scope.categoria.methods.search('nome','');    

    
    	$scope.produto.data = entity.data || {};
		$scope.continue = {};
	
		$scope.produto.on('putSuccess',function(data){
			$state.go('produto.list');
		});
 	}
	
	return ProdutoFormController;   
});
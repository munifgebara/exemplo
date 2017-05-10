define([], function() {


 	GrupoFormController.$inject = ['GrupoService', '$state', 'entity', '$scope', 'gumgaController', 'ProdutoService'];

 	function GrupoFormController(GrupoService, $state, entity, $scope, gumgaController, ProdutoService) {

    	gumgaController.createRestMethods($scope, GrupoService, 'grupo');


	    gumgaController.createRestMethods($scope, ProdutoService, 'produto');
	    $scope.produto.methods.search('nome','');    

	    $scope.produtosOptions=[];
    
    	$scope.grupo.data = entity.data || {};
		$scope.continue = {};
	
		$scope.grupo.on('putSuccess',function(data){
			$state.go('grupo.list');
		});
 	}
	
	return GrupoFormController;   
});
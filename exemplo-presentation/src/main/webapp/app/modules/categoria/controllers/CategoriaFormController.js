define([], function() {


 	CategoriaFormController.$inject = ['CategoriaService', '$state', 'entity', '$scope', 'gumgaController'];

 	function CategoriaFormController(CategoriaService, $state, entity, $scope, gumgaController) {

    	gumgaController.createRestMethods($scope, CategoriaService, 'categoria');



    
    	$scope.categoria.data = entity.data || {};
		$scope.continue = {};
	
		$scope.categoria.on('putSuccess',function(data){
			$state.go('categoria.list');
		});
 	}
	
	return CategoriaFormController;   
});
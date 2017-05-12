define([], function() {

  ProdutoListController.$inject = ['$scope', 'ProdutoService', 'gumgaController'];

  function ProdutoListController($scope, ProdutoService, gumgaController) {

    gumgaController.createRestMethods($scope, ProdutoService, 'produto');

    ProdutoService.resetDefaultState();
    $scope.produto.execute('get');

    $scope.actions = [
      { key: 'option1', label: 'option1' },
      { key: 'option2', label: 'option2' }
    ];

    $scope.search = function(field, param) {
      $scope.query = { searchFields: [field], q: param }
      $scope.produto.methods.search(field,param)
    }

    $scope.advancedSearch = function(param) {
      $scope.produto.methods.advancedSearch(param)
    }

    $scope.action = function(queryaction) {
      console.log(queryaction);
    }

    $scope.tableConfig = {
      columns: 'nome , quantidade, button',
      checkbox: true,
      columnsConfig: [{
        name: 'nome',
        title: '<span gumga-translate-tag="produto.nome"> nome </span>',
        content: '{{$value.nome }}',
        sortField: 'nome'
      },
      {
        name: 'quantidade',
        title: '<span gumga-translate-tag="produto.quantidade"> quantidade </span>',
        content: '{{$value.quantidade }}',
        sortField: 'quantidade'
      }, {
        name: 'button',
        title: ' ',
        content: '<span class="pull-right"><a class="btn btn-primary btn-sm" ui-sref="produto.edit({id: {{$value.id}} })"><i class="glyphicon glyphicon-pencil"></i></a></span>'
      }]
    };

  };
  return ProdutoListController;
});

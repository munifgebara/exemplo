define([], function() {

  ProdutoListController.$inject = ['$scope', 'ProdutoService', 'gumgaController', '$http'];

  function ProdutoListController($scope, ProdutoService, gumgaController, $http) {

    gumgaController.createRestMethods($scope, ProdutoService, 'produto');

    ProdutoService.resetDefaultState();
    $scope.produto.execute('get');
    $scope.produto.on('deleteSuccess', function(data) {
      $scope.produto.execute('get');
    })

    $scope.actions = [
      { key: 'SOBE', label: 'Sobe' },
      { key: 'DESCE', label: 'Desce' }
    ];

      $scope.search = function(field, param) {
        $scope.query = { searchFields: [field], q: param }
        $scope.produto.methods.search(field,param)
      }
      $scope.advancedSearch = function(param) {
        $scope.query = {aq: param.hql}
        $scope.produto.methods.advancedSearch(param)
      }
    $scope.action = function(queryaction) {
      if ($scope.beyond && ($scope.query || !$scope.query)) {
        $http.post('http://localhost:8084/exemplo-api/api/produto/queryaction', queryaction)
          .then(function(response) {
            $scope.produto.methods.get($scope.page)
          })
      } else {
        $http.post('http://localhost:8084/exemplo-api/api/produto/selectedaction', queryaction)
          .then(function(response) {
            $scope.produto.methods.get($scope.page)
          })
      }
    }
    // $scope.action = function(queryaction) {
    //   console.log(queryaction);
    // }

    $scope.tableConfig = {
      columns: 'nome, quantidade, categoria ,button',
      checkbox: true,
      selection: 'multi',
      columnsConfig: [{
        name: 'nome',
        title: '<span gumga-translate-tag="produto.nome"> nome </span>',
        content: '{{$value.nome }}',
        sortField: 'nome'
      },{
        name: 'quantidade',
        title: '<span gumga-translate-tag="produto.quantidade"> quantidade </span>',
        content: '{{$value.quantidade }}',
        sortField: 'quantidade'
      },{
        name: 'categoria',
        title: '<span gumga-translate-tag="produto.categoria"> categoria </span>',
        content: '{{$value.categoria.nome }}',
        sortField: 'categoria'
      }, {
        name: 'button',
        title: ' ',
        content: '<span class="pull-right"><a class="btn btn-primary btn-sm" ui-sref="produto.edit({id: {{$value.id}} })"><i class="glyphicon glyphicon-pencil"></i></a></span>'
      }]
    };

  };
  return ProdutoListController;
});

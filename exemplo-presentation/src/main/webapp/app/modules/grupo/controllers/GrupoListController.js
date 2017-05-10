define([], function() {

  GrupoListController.$inject = ['$scope', 'GrupoService', 'gumgaController'];

  function GrupoListController($scope, GrupoService, gumgaController) {

    gumgaController.createRestMethods($scope, GrupoService, 'grupo');

    GrupoService.resetDefaultState();
    $scope.grupo.execute('get');

    $scope.actions = [
      { key: 'option1', label: 'option1' },
      { key: 'option2', label: 'option2' }
    ];

    $scope.search = function(field, param) {
      $scope.query = { searchFields: [field], q: param }
      $scope.grupo.methods.search(field,param)
    }

    $scope.advancedSearch = function(param) {
      $scope.grupo.methods.advancedSearch(param)
    }

    $scope.action = function(queryaction) {
      console.log(queryaction);
    }

    $scope.tableConfig = {
      columns: 'nome ,button',
      checkbox: true,
      columnsConfig: [{
        name: 'nome',
        title: '<span gumga-translate-tag="grupo.nome"> nome </span>',
        content: '{{$value.nome }}',
        sortField: 'nome'
      }, {
        name: 'button',
        title: ' ',
        content: '<span class="pull-right"><a class="btn btn-primary btn-sm" ui-sref="grupo.edit({id: {{$value.id}} })"><i class="glyphicon glyphicon-pencil"></i></a></span>'
      }]
    };

  };
  return GrupoListController;
});

(function(angular){

    angular.module('app', ['gumga.alert'])

      .controller('ctrl', function($scope, GumgaAlert) {

        $scope.showAlert = function(){
          GumgaAlert.createSuccessMessage("Alerta","Mensagem", {
            offset: 50, //Tamanho da distância entre o alerta e tela.
            timer: 1000000000, //Tempo que irá demorar para a mensagem aparecer após
            delay: 3500,
            alowDismiss:true,
            animationEnter: 'animated bounceInRight',
            animationExit: 'animated bounceOutRight'
          })
        }

      });

})(window.angular);

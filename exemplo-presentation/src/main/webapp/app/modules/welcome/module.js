
define(function (require) {
    'use strict';

    require('angular');
    require('angular-ui-router');


    WelcomeConfiguration.$inject = ['$stateProvider'];
    function WelcomeConfiguration($stateProvider) {
        $stateProvider
            .state('welcome.home', {
                url: '/home',
                templateUrl: 'app/modules/welcome/views/welcome.html'
            });
    }
   

    return angular.module('app.welcome', ['ui.router']).config(WelcomeConfiguration);
});

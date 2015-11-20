/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app", ['ui.router']);

angular.module('ndtM-app').run(function ($rootScope) {
    $rootScope.user = {};
});

angular.module('ndtM-app', ['ui.router', 'ui.bootstrap', 'ngAside']).config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    //Now set up the states
    $stateProvider
        .state('/home/', {
            url: '/',
            templateUrl: '/manager/views/home.html',
            controller: 'ndtControllerManager'
        })

});
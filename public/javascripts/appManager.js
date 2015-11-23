/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app", []);

angular.module('ndtM-app').run(function ($rootScope) {
    $rootScope.user;
});

angular.module('ndtM-app', ['ui.router', 'ui.bootstrap', 'ngAside', 'uiInfoUser', 'uiLoginUser', 'ngCookies']).config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    //Now set up the states
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/admin/views/home.html',
            controller: 'ndtControllerManager'
        })
        .state('logout', {
            url: '/logout/',
            templateUrl: '/admin/views/home.html',
            controller: 'ndtLogOffController'
        })
});
/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app", ['ui.router']);

angular.module("ndt-app").run(function ($rootScope) {
    /**
     * The user data.
     *
     * @type {{}}
     */
    $rootScope.user = {};
});

angular.module("ndt-app", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    //Now set up the states
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: "/views/home.html",
            controller: "ndtController"
        })
        .state('categorias', {
            url: '/categorias/',
            templateUrl: "/views/categorias.html"
        })
        .state('produtos', {
            url: '/categorias/produtos/',
            templateUrl: "/views/produtos.html"
        })
        .state('galeria', {
            url: '/galeria/',
            templateUrl: 'views/galeria.html'
        })
        .state('contato', {
            url: '/contato/',
            templateUrl: 'views/contato.html'
        })
        .state('saiba_mais', {
            url: '/saiba_mais/',
            templateUrl: '/views/saiba.html'
        })
});

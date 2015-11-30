/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app", ['angular-google-analytics']);

angular.module('ndt-app').config(function(AnalyticsProvider){
    AnalyticsProvider
        .logAllCalls(true)
        .startOffline(true)
        .useEcommerce(true, true);
    AnalyticsProvider.setAccount('UA-61707535-1');
    AnalyticsProvider.useDisplayFeatures(true);
    AnalyticsProvider.useEnhancedLinkAttribution(true);
    AnalyticsProvider.useECommerce(true, true);
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.setHybridMobileSupport(true);
    AnalyticsProvider.setDomainName('nildadocetentacao.com.br');
});

angular.module("ndt-app").run(function ($rootScope) {
    $rootScope.user = {};
});

angular.module("ndt-app", ['ui.router', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider) {

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
            templateUrl: "/views/categorias.html",
            controller: "ndtCatContol"
        })
        .state('lista_produtos', {
            url: '/product/list_products/:id/',
            templateUrl: '/views/lista_produtos.html',
            controller: "ndtProdsControl"
        })
        .state('produto_detalhe', {
            url: '/product/get/:id/',
            templateUrl: '/views/produto.html',
            controller: "ndtProdControl"
        })
        .state('galeria', {
            url: '/galeria/',
            templateUrl: 'views/galeria.html',
            controller: "ndtGalleryControl"
        })
        .state('contato', {
            url: '/contato/',
            templateUrl: 'views/contato.html',
            controller: "ndtContactControl"
        })
        .state('saiba_mais', {
            url: '/saiba_mais/',
            templateUrl: '/views/saiba.html',
            controller: "ndtKnowControl"
        })
});





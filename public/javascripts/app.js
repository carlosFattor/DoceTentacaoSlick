/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app", ['ui.router', 'ngAnimate', 'ui.bootstrap']);

angular.module("ndt-app").run(function ($rootScope) {

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
            templateUrl: "/views/categorias.html",
            controller: function ($scope, listAPI) {
                $scope.msgFail = "";
                $scope.categories = [];
                $scope.app = "Nilda Doce Tentação";

                var myList = function () {
                    listAPI.getListCategory()
                        .success(function (data, status) {
                            $scope.categories = data.response;
                        })
                        .error(function (data, status) {
                            $scope.msgFail = "não foi possivel carregar os dados! " + status;
                        })
                }
                myList();
            }
        })
        .state('lista_produtos', {
            url: '/product/list_products/:id/',
            templateUrl: '/views/lista_produtos.html',
            controller: function($scope, listAPI, $stateParams){
                $scope.msgFail;
                $scope.products = [];

                var myList = function() {
                    listAPI.getListProducts($stateParams.id)
                        .success(function(data, status){
                            $scope.products = data.response;
                        })
                        .error(function(data, status){
                            $scope.msgFail = "não foi possivel carregar os dados! " + status;
                        })
                }
                myList();
            }
        })
        .state('produto_detalhe', {
            url: '/product/get/:id/',
            templateUrl: '/views/produto.html',
            controller: function($scope, listAPI, $stateParams){
                $scope.msgFail;
                $scope.product;

                var myProduct = function(){
                    listAPI.getProduct($stateParams.id)
                        .success(function(data, status){
                            $scope.product = data.response;
                        })
                        .error(function(data, status){
                            $scope.msgFail = "não foi possivel carregar os dados! " + status;
                        })
                }
                myProduct();
            }
        })
        .state('galeria', {
            url: '/galeria/',
            templateUrl: 'views/galeria.html',
            controller: function($scope, listAPI){
                $scope.msgFail;
                $scope.galleryItens = [];
                var funcGallery = function(){
                    $('ul.magnific-gallery').each(function () {
                        console.log( "ready!" );
                        openGallery.call(this, 'mfp-example');
                    });
                }


                var myGallery = function(){
                    listAPI.getListGallery()
                        .success(function(data, status){
                            $scope.galleryItens = data.response;
                        })
                        .error(function(data, status){
                            $scope.msgFail = "não foi possivel carregar os dados! " + status;
                        })
                }
                myGallery();
                funcGallery();
            }
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



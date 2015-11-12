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
            templateUrl: 'views/contato.html',
            controller: function($scope, $stateParams){

            }
        })
        .state('saiba_mais', {
            url: '/saiba_mais/',
            templateUrl: '/views/saiba.html',
            controller: function($scope){
                var mapOptions = {
                    zoom: 17,
                    center: new google.maps.LatLng(-21.99859, -47.884205),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                $scope.markers = [];
                var infoWindow = new google.maps.InfoWindow();

                var createMarker = function (info){

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.long),
                        title: info.city,
                        tel: info.tel
                    });
                    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content + marker.tel);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);

                }

                for (var i = 0; i < cities.length; i++){
                    createMarker(cities[i]);
                }

                $scope.openInfoWindow = function(e, selectedMarker){
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }
            }
        })
});

//Data to googleMaps
var cities = [
    {
        city : 'São Carlos',
        desc : 'Nilda Doce Tentação',
        tel: 'WhatsApp - (16) 98156-2280',
        lat : -21.99858,
        long : -47.884205
    }
    ]



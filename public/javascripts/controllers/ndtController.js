/**
 * Created by carlos on 15/10/15.
 */
'use strict';

angular.module("ndt-app").controller("ndtController", function ($scope, listAPI) {
    $scope.message = "";
    $scope.app = "Nilda Doce Tentação";
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.slides = [];

    var myList = function () {
        listAPI.getListProductFeatured()
            .success(function (data, status) {
                $scope.slides = data.response.map(function(element){
                    return {image: element.imgSmallURL};
                });
            })
            .error(function (data, status) {
                $scope.message = "não foi possivel carregar os dados! " + status;
            })
    }

    myList();
});

angular.module("ndt-app").controller("ndtCatContol", function($scope, listAPI){
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
});

angular.module("ndt-app").controller("ndtProdsControl", function($scope, listAPI, $stateParams){
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
});

angular.module("ndt-app").controller("ndtProdControl", function($scope, listAPI, $stateParams){
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
});

angular.module("ndt-app").controller("ndtGalleryControl", function($scope, listAPI){
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
});

angular.module("ndt-app").controller("ndtContactControl", function($scope, listAPI){
    $scope.statusOk=false;
    $scope.statusNOK=false;
    $scope.msgFail;
    $scope.msgOk;

    $scope.sendContact = function(contact){
        if($scope.contactForm.$valid) {

            listAPI.sendContact(angular.copy(contact))
                .success(function (data, status) {
                    delete $scope.contact;
                    $scope.contactForm.$setPristine();
                    $scope.msgOk = data.response;
                    $scope.statusNOk = false;
                    $scope.statusOk = true;
                })
                .error(function (data, status) {
                    console.log(data+" | "+status )
                    $scope.msgFail = "não foi possivel enviar o e-mail! ";
                    $scope.statusOk = false;
                    $scope.statusNOk = true;
                })
        }

    }
});

angular.module("ndt-app").controller("ndtKnowControl", function($scope, listAPI){
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
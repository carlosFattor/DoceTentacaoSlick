/**
 * Created by carlos on 15/10/15.
 */
'use strict';

angular.module("ndt-app").controller("ndtController", function ($scope, listAPI) {
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    $scope.infoNews= "Deixe o Seu Email";
    $scope.error;
    $scope.msgOk;
    $scope.msgNOK;
    $scope.app = "Nilda Doce Tentação";
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.slides = [];


    $scope.sendNews = function(news){
        if(filtro.test(news)){

            listAPI.sendNews({email : news})
                .success(function(data, status){
                    $scope.msgOk = data.response;
                })
                .error(function(data, status){
                    $scope.msgNOK = data.status;
                })
        }
    }

    var getListProducts = function(name) {
        listAPI.findListProds("prod1")
            .success(function(data, status){
                console.log(data)
            })
    }

    var myList = function () {
        listAPI.getListProductFeatured()
            .success(function (data, status) {
                $scope.slides = data.response.map(function(element){
                    return {image: element.imgSmallURL,
                            text: element.name};
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

angular.module("ndt-app").controller("ndtContactControl", function($scope, listAPI, nameFilter){
    $scope.frmContact = {};
    $scope.statusOk=false;
    $scope.statusNOK=false;
    $scope.msgFail;
    $scope.msgOk;

    $scope.sendContact = function(contact){

        if($scope.frmContact.$valid) {
            contact.name = nameFilter(contact.name);

            listAPI.sendContact(angular.copy(contact))
                .success(function (data, status) {
                    delete $scope.contact;
                    $scope.frmContact.$setPristine();
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
        }else{
            console.log($scope.frmContact);
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
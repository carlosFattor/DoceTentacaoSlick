/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app").controller("ndtController", function ($scope, listAPI) {
    $scope.message = "";
    $scope.app = "Nilda Doce Tentação";
    $scope.listaProductFeatured = [];
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.slides = [];

    var myList = function () {
        listAPI.getListProductFeatured()
            .success(function (data, status) {
                $scope.listaProductFeatured = data.response;
            })
            .error(function (data, status) {
                $scope.message = "não foi possivel carregar os dados! " + status;
            })
    }

    myList();

});

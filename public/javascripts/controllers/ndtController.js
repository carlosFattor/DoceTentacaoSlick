/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app").controller("ndtController", function ($scope, listAPI) {
    $scope.message = "";
    $scope.app = "Nilda Doce Tentação";
    $scope.listaCategory = [];
    $scope.listaProductFeatured = [];

    var myList = function () {
        listAPI.getListCategory()
            .success(function (data, status) {
                $scope.listaCategory = data.response;
            }).error(function (data, status) {
                $scope.message = "não foi possivel carregar os dados! "+status;
            })

        listAPI.getListProductFeatured()
            .success(function(data, status){
                $scope.listaProductFeatured = data.response;
            })
            .error(function(data, status){
                $scope.message = "não foi possivel carregar os dados! "+status;
            })

    }

    myList();
});
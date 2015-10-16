/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app").controller("ndtController", function ($scope, listAPI) {
    $scope.message = "Hello World!!!";
    $scope.app = "Nilda Doce Tentação";
    $scope.lista = []

    var myLista = function () {
        listAPI.getList()
            .success(function (data, status) {
                $scope.lista = data;
            }).error(function (data, status) {
                $scope.message = "não foi possivel carregar os dados!";
            });
    }

    myLista();
});
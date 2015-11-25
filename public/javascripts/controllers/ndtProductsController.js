/**
 * Created by carlos on 25/11/15.
 */
angular.module('ndtM-app').controller('ndtProductsController', function($rootScope, $scope, listAPIManager){

    $scope.msgOk;
    $scope.msgNOk;
    $scope.products;
    $scope.categories = {};

    var getProducts = function(){
        listAPIManager.getProducts()
            .success(function(data, status){
                $scope.products = data.response;
            })
            .error(function(data, status){
                console.log(status);
            });
    };
    var getCategories = function () {
        listAPIManager.getCategories()
            .success(function (data, status) {
                $scope.categories = data.response;
            })
            .error(function (data, status) {
                console.log(status);
            });
    }

    $scope.getProdByCat = function(idCat){
         var cat = $scope.categories.filter(function(cats){
             return cats.id === idCat;
        });
       console.log(cat);
        return cat.name;
    }

    getCategories();
    getProducts();

})
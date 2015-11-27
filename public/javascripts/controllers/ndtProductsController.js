/**
 * Created by carlos on 25/11/15.
 */
angular.module('ndtM-app').controller('ndtProductsController', function ($rootScope, $scope, listAPIManager, $uibModal, $log, uiConfirmation) {

    $scope.msgOk;
    $scope.msgNOk;
    $scope.products = [];
    $scope.categories = [];

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
    $scope.getCategoryById = function(id){
        var cat;
        cat = $scope.categories.filter(function(cat){
            return cat.id === id;
        });
        if(cat.length === 0){
            return "";
        }
        return cat[0].name;
    };

    var refreshItens = function(){
        getCategories();
        getProducts();
    };
    refreshItens();

    $scope.open = function(prod){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalProduct.html',
            controller: 'ModalInstanceProductCtrl',
            size: 'lg',
            resolve: {
                categories: function(){
                    return $scope.categories;
                },
                prodToOpen: function(){
                    return prod;
                },

            }
        });
        modalInstance.result.then(function(prodSelected){
            listAPIManager.updateProduct(prodSelected)
                .success(function(data, status){
                    refreshItens();
                })
                .error(function(data, status){
                    console.log(status);
                }).then(function(){
                    $log.info('update product: ' +prodSelected.id);
                });
            $scope.selected = prodSelected;
        });
    };

    $scope.create = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalProduct.html',
            controller: 'ModalInstanceProductCtrl',
            size: 'lg',
            resolve: {
                categories: function(){
                    return $scope.categories;
                },
                prodToOpen: function(){
                    return newProd = {};
                }
            }
        });
        modalInstance.result.then(function(newProd){
            listAPIManager.createProduct(newProd)
                .success(function(data, status){
                    refreshItens();
                })
                .error(function(data, status){
                    refreshItens();
                }).then(function(){
                    $log.info("created gallery");
                });
        });
    };

    $scope.delete = function (prod) {

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Apagar Produto',
            headerText: 'Apagar ' + prod.name + '?',
            bodyText: 'Tem certeza que quer apagar esse item?'
        };

        uiConfirmation.showModal({}, modalOptions).then(function (result) {

            listAPIManager.deleteProduct(prod.id)
                .success(function(data, status){
                    refreshItens();
                })
                .error(function(data, status){
                    console.log(status);
                });
        });
    };
});

angular.module('ndtM-app').controller('ModalInstanceProductCtrl', function($scope, $uibModalInstance, prodToOpen, categories){
    $scope.categories = categories;
    $scope.prodToOpen = prodToOpen;

    $scope.ok = function () {
        $uibModalInstance.close($scope.prodToOpen);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
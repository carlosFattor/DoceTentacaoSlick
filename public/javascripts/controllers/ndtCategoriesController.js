/**
 * Created by carlos on 25/11/15.
 */
angular.module('ndtM-app').controller('ndtCategoriesController', function ($rootScope, $scope, listAPIManager, $uibModal, $log, uiConfirmation) {
    $scope.msgOk;
    $scope.msgNOk;
    $scope.categories = {};

    var getCategories = function () {
        listAPIManager.getCategories()
            .success(function (data, status) {
                $scope.categories = data.response;
            })
            .error(function (data, status) {
                console.log(status);
            });
    }
    getCategories();

    $scope.open = function(cat){

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalCategory.html',
            controller: 'ModalInstanceCategoryCtrl',
            size: 'lg',
            resolve: {
                catToOpen: function(){
                    return cat;
                }
            }
        });

        modalInstance.result.then(function(galSelected){
            listAPIManager.updateCategory(galSelected)
                .success(function(data, status){
                    getCategories();
                })
                .error(function(data, status){
                    console.log(status);
                }).then(function(){
                    $log.info('update gallery: '+galSelected.id);
                })

            $scope.selected = galSelected;
        });
    };

    $scope.create = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalCategory.html',
            controller: 'ModalInstanceCategoryCtrl',
            size: 'lg',
            resolve: {
                catToOpen: function(){
                    return newCat = {};
                }
            }
        });
        modalInstance.result.then(function(newCat){
            listAPIManager.createCat(newCat)
                .success(function(data, status){
                    getCategories();
                })
                .error(function(data, status){
                    console.log(status);
                }).then(function(){
                    $log.info("created gallery");
                });
        });
    };

    $scope.delete = function (cat) {

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Apagar Categoria',
            headerText: 'Apagar ' + cat.name + '?',
            bodyText: 'Tem certeza que quer apagar esse item?'
        };

        uiConfirmation.showModal({}, modalOptions).then(function (result) {

            listAPIManager.deleteCategory(cat.id)
                .success(function(data, status){
                    getCategories();
                })
                .error(function(data, status){
                    console.log(status);
                });
        });
    };
});

angular.module('ndtM-app').controller('ModalInstanceCategoryCtrl', function($scope, $uibModalInstance, catToOpen){
    $scope.catToOpen = catToOpen;

    $scope.ok = function () {
        $uibModalInstance.close($scope.catToOpen);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
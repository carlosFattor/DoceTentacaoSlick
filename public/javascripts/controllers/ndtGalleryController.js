/**
 * Created by carlos on 25/11/15.
 */
angular.module('ndtM-app').controller('ndtGalleryController', function($rootScope, $scope, listAPIManager, $uibModal, $log, uiConfirmation){

    $scope.msgOk;
    $scope.msgNOk;
    $scope.products;
    $scope.galleries = {};

    var getGallery = function(){
        listAPIManager.getGallery()
            .success(function(data, status){
                $scope.galleries = data.response;
            })
            .error(function(data, status){
                console.log(status);
            })
    };
    getGallery();

    $scope.open = function(gal){

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalGallery.html',
            controller: 'ModalInstanceGalleryCtrl',
            size: 'lg',
            resolve: {
                galToOpen: function(){
                    return gal;
                }
            }
        });

        modalInstance.result.then(function(galSelected){
            listAPIManager.updateGallery(galSelected)
                .success(function(data, status){
                    getGallery();
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
            templateUrl: 'myModalGallery.html',
            controller: 'ModalInstanceGalleryCtrl',
            size: 'lg',
            resolve: {
                galToOpen: function(){
                    return newGall = {};
                }
            }
        });
        modalInstance.result.then(function(newGall){
            listAPIManager.createGall(newGall)
                .success(function(data, status){
                    getGallery();
                })
                .error(function(data, status){
                    console.log(status);
                }).then(function(){
                    $log.info("created gallery");
                });
        });
    };

    $scope.delete = function (gal) {

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Apagar Galeria',
            headerText: 'Apagar ' + gal.name + '?',
            bodyText: 'Tem certeza que quer apagar esse item?'
        };

        uiConfirmation.showModal({}, modalOptions).then(function (result) {

            listAPIManager.deleteGallery(gal.id)
                .success(function(data, status){
                    getGallery();
                })
                .error(function(data, status){
                    console.log(status);
                });
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

angular.module('ndtM-app').controller('ModalInstanceGalleryCtrl', function($scope, $uibModalInstance, galToOpen){
    $scope.galToEdit = galToOpen;

    $scope.ok = function () {
        $uibModalInstance.close($scope.galToEdit);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
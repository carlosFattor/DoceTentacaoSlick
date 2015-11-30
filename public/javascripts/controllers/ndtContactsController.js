/**
 * Created by carlos on 25/11/15.
 */
angular.module('ndtM-app').controller('ndtContactsController', function($rootScope, $scope, listAPIManager, $log, $uibModal){

    $scope.msgOk;
    $scope.msgNOk;
    $scope.products;
    $scope.contacts = {};

    var getContacts = function(){
        listAPIManager.getContacts()
            .success(function(data, status){
               $scope.contacts = data.response;
            })
            .error(function(data, status){
                console.log(data.response);
            });
    };

    $scope.open = function(cont){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContact.html',
            controller: 'ModalInstanceContactCtrl',
            size: 'lg',
            resolve: {
                contToOpen: function(){
                    return cont;
                }
            }
        });
    };

    getContacts();
});

angular.module('ndtM-app').controller('ModalInstanceContactCtrl', function($scope, $uibModalInstance, contToOpen ){
    $scope.contToOpen = contToOpen;

    $scope.ok = function () {
        $uibModalInstance.close($scope.contToOpen);
    };

});
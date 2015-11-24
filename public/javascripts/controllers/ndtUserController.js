/**
 * Created by carlos on 23/11/15.
 */
angular.module('ndtM-app').controller('ndtUsersController', function($rootScope, $scope, listAPIManager, $uibModal, $log, uiConfirmation){
    $scope.animationsEnabled = true;

    $scope.users = {};
    var users = function(){
        listAPIManager.getUsers()
            .success(function(data, status){
                $scope.users = data.response.filter(function(user){
                    return delete user.password;
                });
            })
            .error(function(data, status){
                console.log(status);
            })
    }
    users();

    $scope.delete = function (user) {

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Apagar Usuário',
            headerText: 'Apagar ' + user.name + '?',
            bodyText: 'Tem certeza que quer apagar esse usuário?'
        };

        uiConfirmation.showModal({}, modalOptions).then(function (result) {

            listAPIManager.deleteUsers(user.id)
                .success(function(data, status){
                    users();
                })
                .error(function(data, status){
                    console.log(status);
                });
        });
    }

    $scope.create = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                userToOpen: function(){
                    return newUser = {};
                }
            }
        });
        modalInstance.result.then(function(newUser){

            listAPIManager.createUser(newUser)
                .success(function(data, status){
                    users();
                })
                .error(function(data, status){
                    console.log(status);
                })
        }, function(){
            $log.info('Modal dismissed at: '+ new Date());
        });
    }

    $scope.open = function(user){

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                userToOpen: function(){
                    return user;
                }
            }
        });

        modalInstance.result.then(function(userSelected){
            listAPIManager.updateUser(userSelected)
                .success(function(data, status){
                    users();
                })
                .error(function(data, status){
                    console.log(status);
                })

            $scope.selected = userSelected;
        }, function(){
            $log.info('Modal dismissed at: '+ new Date());
        });
    };
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

angular.module('ndtM-app').controller('ModalInstanceCtrl', function($scope, $uibModalInstance, userToOpen){
    $scope.userToEdit = userToOpen;

    $scope.ok = function () {
        $uibModalInstance.close($scope.userToEdit);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
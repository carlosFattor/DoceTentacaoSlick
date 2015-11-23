/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app").controller("ndtControllerManager", function ($rootScope, $scope, $aside) {

    $scope.asideState = {
        open: false
    };
    $scope.openAside = function (position, backdrop) {
        $scope.asideState = {
            open: true,
            position: position
        };

        function postClose() {
            $scope.asideState.open = false;
        }

        $aside.open({
            templateUrl: '/admin/views/aside.html',
            placement: position,
            size: 'sm',
            backdrop: backdrop,
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function (e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        }).result.then(postClose, postClose);
    }

});

angular.module('ndtM-app').controller('ndtLogOffController', function($rootScope, $state, $cookieStore){
    var logoff = function() {
        $rootScope.user = null;
        $rootScope.infoUser = null;
        console.log("logoff");
        $cookieStore.remove("user");
        $cookieStore.remove("infoUser");
        $state.go('home')
    }
    logoff();
})
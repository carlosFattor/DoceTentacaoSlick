/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app").controller("ndtControllerManager", function($scope, $aside){
    var isopen_usermenu = false;

    $scope.asideState = {
        open: false
    };

    $scope.openAside = function(position, backdrop) {
        $scope.asideState = {
            open: true,
            position: position
        };

        function postClose() {
            $scope.asideState.open = false;
        }

        $aside.open({
            templateUrl: '/manager/views/aside.html',
            placement: position,
            size: 'sm',
            backdrop: backdrop,
            controller: function($scope, $uibModalInstance) {
                $scope.ok = function(e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function(e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        }).result.then(postClose, postClose);
    }
});
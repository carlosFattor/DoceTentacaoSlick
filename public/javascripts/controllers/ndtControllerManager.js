/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app").controller("ndtControllerManager", function ($scope, $aside, listAPIManager, $rootScope) {
    $scope.frmLogin = {};
    $scope.infoUser;
    /* {
        url: '/manager/views/info_user.html',
        name: 'Carlos Alexandre Fattor',
        avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtf1/v/t1.0-1/p160x160/10635878_778561655538508_4093947711698454305_n.jpg?oh=23493af3735455769034446da7fcd8e9&oe=56B697C4&__gda__=1458371761_bb2a71c27193c66a9c8e9297225b3845',
        itemMenu: [
            { nameMenu: 'Painel', class: 'fa fa-tachometer', link: '#'},
            { nameMenu: 'Config', class: 'fa fa-cogs', link: '#'},
            { nameMenu: 'Ajuda', class: 'fa fa-question', link: '#'},
            { nameMenu: 'Logoff', class: 'fa fa-power-off', link: '#'}
        ]
    }*/

    $scope.logUser = function(objUser) {

        if($scope.frmLogin.$valid){
            listAPIManager.getUser(angular.copy(objUser))
                .success(function(data, status){
                    console.log(data.response);
                })
                .error(function(data, status){
                    console.log(status);
                })
        };
    };

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
            templateUrl: '/manager/views/aside.html',
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
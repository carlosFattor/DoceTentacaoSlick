/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app").controller("ndtControllerManager", function ($rootScope, $scope) {

});

angular.module('ndtM-app').controller('ndtLogOffController', function($rootScope, $state, $cookieStore, listAPIManager){
    var logoff = function() {
        $rootScope.user = null;
        $rootScope.infoUser = null;
        $cookieStore.remove("user");
        $cookieStore.remove("infoUser");
        $cookieStore.remove("user_auth");
        console.log('go out...');
        listAPIManager.logout;
        $state.go('home')
    }
    logoff();
})

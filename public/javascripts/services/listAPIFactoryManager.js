/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ndtM-app').factory('listAPIManager', function ($http) {

    var factory = {};

    factory.loginUser = function(credentials) {
        return $http({
            method: 'post',
            url: '/admin/users/login/',
            data: credentials
        });
    };
    factory.getUsers = function(){
        return $http({
            method: 'get',
            url: '/admin/users/'
        })
    };

    return factory;
});
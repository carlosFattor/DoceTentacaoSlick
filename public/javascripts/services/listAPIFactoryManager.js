/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ndtM-app').factory('listAPIManager', function ($http) {

    var factory = {};

    factory.getUserValue = function(credentials) {
        return $http({
            method: 'post',
            url: '/admin/user/',
            data: credentials
        });
    };

    return factory;
});
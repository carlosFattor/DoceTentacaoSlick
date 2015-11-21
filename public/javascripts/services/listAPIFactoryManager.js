/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ndtM-app').factory('listAPIManager', function ($http, configM) {

    var _getUser = function (user) {
        $http.post(configM.baseURLM + "/admin/user/", user);
    };

    return {
        getUser: _getUser
    };
});
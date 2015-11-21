/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ndtM-app').factory('listAPIManager', function($http, config){

    var _sendUser = function(user){
        $http.post(config.baseURL+"/admin/user/", user);
    };

    return {
        sendUser: _sendUser
    };
});
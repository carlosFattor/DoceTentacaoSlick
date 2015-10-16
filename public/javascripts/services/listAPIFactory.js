/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app").factory("listAPI", function($http, config){
    var _getList = function(){
        return $http.get(config.baseURL+"/list/")
    }

    return {
        getList: _getList
    }
});

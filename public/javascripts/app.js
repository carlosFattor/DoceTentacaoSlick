/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app", []);

angular.module("ndt-app").run(function($rootScope){
    /**
     * The user data.
     *
     * @type {{}}
     */
    $rootScope.user = {};
});

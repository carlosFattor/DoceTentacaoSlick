'use strict';
/**
 * Created by carlos on 19/11/15.
 */
angular.module("uiInfoUser", []);
angular.module("uiInfoUser").directive('infoUser', function(){

    return {
        replace: true,
        restrict: 'E',
        templateUrl: '/manager/views/info_user.html',
        scope: {
            info: "="
        },
        link: function(scope, element, attrs) {
            scope.isOpen = false;
            scope.menu_open = function(open){
                scope.isOpen = !open;
            }
        },
        transclude: true
    };
});


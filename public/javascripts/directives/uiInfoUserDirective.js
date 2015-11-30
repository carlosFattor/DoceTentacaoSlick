/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module("uiInfoUser", []);
angular.module("uiInfoUser").directive('infoUser', function(){

    return {
        replace: true,
        restrict: 'E',
        templateUrl: '/admin/views/info_user.html',
        scope: {
            info: "="
        },
        link: function(scope, element, attrs) {
            scope.isOpen = false;
            scope.menu_open = function(open){
                scope.isOpen = !open;
            }
            $(document).bind('click', function(event){
                var isClickedElementChildOfPopup = element
                        .find(event.target)
                        .length > 0;

                if (isClickedElementChildOfPopup)
                    return;

                scope.$apply(function(){
                    scope.isOpen = false;
                });
            });
        },
        transclude: true
    };
});


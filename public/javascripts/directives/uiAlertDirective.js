angular.module("ndt-app").directive("uiAlert", function(){

    return {
        templateUrl: "/views/ui_alert.html",
        replace: true,
        restrict: "AE",
        scope: {
            title: "@",
            message: "="
        }
    };
});
angular.module("ndt-app").directive("uiAlert", function(config){

    return {
        templateUrl: config.baseURL+"/views/ui_alert.html",
        replace: true,
        restrict: "AE",
        scope: {
            title: "@",
            message: "="
        }
    };
});
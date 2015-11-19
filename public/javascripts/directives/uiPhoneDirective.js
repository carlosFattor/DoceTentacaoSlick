angular.module("ndt-app").directive("uiPhone", function () {

    var _formatPhone = function (phone) {
        phone = phone.replace(/[^0-9]+/g, "");

        if (phone.length > 2) {
            phone = "(" + phone.substring(0, 2) + ") " + phone.substring(2);
        }
        if (phone.length > 9) {
            phone = phone.substring(0, 9) + "-" + phone.substring(9, 14);
        }
        if (phone.length > 14) {
            phone = phone.replace("-", "");
            phone = phone.substring(0, 6) + " " + phone.substring(6, 10) + "-" + phone.substring(10, 15);
        }
        return phone;
    };

    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatPhone(ctrl.$viewValue));
                ctrl.$render();
            });

            ctrl.$parsers.push(function (value) {
                if (value.length === 14 || value.length === 15) {
                    return value;
                }
            });
        }
    };
});
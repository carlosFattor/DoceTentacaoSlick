/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ngAside', ['ui.bootstrap.modal']);
angular.module('ngAside').factory('$aside', function ($uibModal) {
    var defaults = this.defaults = {
        placement: 'left'
    };

    var asideFactory = {
        // override open method
        open: function (config) {
            var options = angular.extend({}, defaults, config);
            // check placement is set correct
            if (['left', 'right', 'bottom', 'top'].indexOf(options.placement) === -1) {
                options.placement = defaults.placement;
            }
            var vertHoriz = ['left', 'right'].indexOf(options.placement) === -1 ? 'vertical' : 'horizontal';
            // set aside classes
            options.windowClass = 'ng-aside ' + vertHoriz + ' ' + options.placement + (options.windowClass ? ' ' + options.windowClass : '');
            delete options.placement
            return $uibModal.open(options);
        }
    };

    // create $aside as extended $uibModal
    var $aside = angular.extend({}, $uibModal, asideFactory);
    return $aside;
});

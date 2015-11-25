/**
 * Created by carlos on 25/11/15.
 */
angular.module('ngGalleria', [])
angular.module('ngGalleria').provider('galleria', function(){
    var path;
    // default config
    var options = {
        showInfo: true,
        _toggleInfo: false
    };

    this.setPath = function(input){
        path = input;
    };

    this.setOptions = function(input){
        options = input
    };
    this.$get = function galleriaFactory(){
        return {
            path: path,
            options:options
        };
    };
});
angular.module('ngGalleria').directive('ngGalleria', function () {
    return {
        restrict: 'E',
        controller: function galleriaDirectiveCtrl($scope, $element, $timeout, galleria) {

            var obj = $element.find('.galleria');
            Galleria.configure(galleria.options);


            var GalleriaApiReference;
            $timeout(function () {
                var index = -1;
                for(var i = 0; i < $scope.source.images.length; i++){
                    if($scope.source.images[i].image === $scope.source.index.image){
                        index = i;
                        break;
                    }
                }

                Galleria.run(obj, {
                    show: index,
                    extend: function(){
                        GalleriaApiReference = this;
                    }
                });
            });

            $scope.$on('$destroy', function() {
                if(GalleriaApiReference && GalleriaApiReference.destroy)
                    GalleriaApiReference.destroy();
            });
        },
        template: '<div class="galleria" style="height: 100%; width: 100%">' +
        '<a href="{{img.image}}" ng-repeat="img in source.images">' +
        '<img src="{{img.thumb}}" data-title="{{img.title}}" data-description="{{img.description}}"' +
        ' data-big="{{img.big_image}}">' +
        '</a>' +
        '</div>',
        scope: {
            source: '='
        }
    };
});
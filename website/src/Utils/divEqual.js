(function () {
    'use strict';
    function divEqual($window, _) {
        return {
            restrict: 'E',
            link: function sameWidth(scope, element, attrs) {

                function applyDimensions(newValue, oldValue) {
                    var childElems = element[0].getElementsByClassName('div-equal-child');
                    var width = element.width();
                    var ss = _.size(childElems);
                    var panelsWidth = width / _.size(childElems);

                    _.forEach(childElems, iterateChilds);
                    function iterateChilds(item) {
                        angular.element(item).css('width', panelsWidth);
                    }
                }

                $window.addEventListener('resize', _.debounce(applyDimensions, 500));
                element.ready(applyDimensions);
            }
        };
    }
    angular
        .module('EasyBikeApp.Utils')
        .directive('divEqual', divEqual);
})();

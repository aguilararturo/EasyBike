(function () {
    'use strict';
    function autoFillScreen($window, _) {
        return {
            restrict: 'EA',
            link: function linkheigthAsWidth(scope, element, attrs) {
                function applyDimensions(newValue, oldValue) {
                    var panelsWidth =  $window.outerHeight - element.offset().top;
                    element.css('height', panelsWidth);
                }

                function watchOffset() {
                    element.ready(applyDimensions);
                }

                $window.addEventListener('resize', _.debounce(watchOffset, 500));
                watchOffset();
            }
        };
    }
    angular
        .module('EasyBikeApp.Utils')
        .directive('autoFillScreen', autoFillScreen);
})();

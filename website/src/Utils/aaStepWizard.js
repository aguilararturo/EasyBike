(function () {
    'use strict';
    function aaStepWizard($window, _) {
        return {
            restrict: 'E',
            link: function linkheigthAsWidth(scope, element, attrs) {
                var dootElem = angular.element(element[0].getElementsByClassName('step-doot'));
                function applyDimensions(newValue, oldValue) {
                    var leftElem = angular.element(element[0].getElementsByClassName('step-left'));

                    var width = element.width();
                    var panelsWidth = (width - (dootElem.width() + 10));
                    leftElem.css('width', panelsWidth);
                }

                $window.addEventListener('resize', _.debounce(applyDimensions, 500));
                element.ready(applyDimensions);
            }
        };
    }
    angular
        .module('EasyBikeApp.Utils')
        .directive('aaStepAutoSize', aaStepWizard);
})();

(function () {
    'use strict';
    function aaStepWizard($window, _) {
        return {
            restrict: 'E',
            link: function linkheigthAsWidth(scope, element, attrs) {

                var dootElem = angular.element(element[0].getElementsByClassName('step-doot'));
                var leftElem = angular.element(element[0].getElementsByClassName('step-left'));
                var rigthElem = angular.element(element[0].getElementsByClassName('step-rigth'));

                function applyDimensions(newValue, oldValue) {
                    var width = element.width();
                    var panelsWidth = (width - (dootElem.width() + 20));
                    leftElem.css('width', panelsWidth);
                    rigthElem.css('width', panelsWidth);
                }

                $window.addEventListener('resize', _.debounce(applyDimensions, 500));
                element.ready(applyDimensions());
            }
        };
    }
    angular
        .module('EasyBikeApp.Utils')
        .directive('aaStepAutoSize', aaStepWizard);
})();

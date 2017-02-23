(function () {
    'use strict';
    function onEnterKey($window, _) {
        return {
            restrict: 'A',
            controller: 'OnEnterActionController',
            controllerAs: 'onEnterCtrl',
            bindToController: {
                onEnterKey: '&'
            }
        };
    }

    function OnEnterActionController(_, $element) {
        var onEnterCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            $element.bind("keypress", onKeyPress);
        }

        function loadMenuItems(response) {
            userCtrl.users = response;
        }

        function onKeyPress(event) {
            var key = typeof event.which === "undefined" ? event.keyCode : event.which;
            if (key === 13) {
                if (!_.isUndefined(onEnterCtrl.onEnterKey)) {
                    onEnterCtrl.onEnterKey();
                   event.preventDefault();
                }
            }
        }

        onEnterCtrl.$onInit = $onInit;
    }


    angular
        .module('EasyBikeApp.Utils')
        .controller('OnEnterActionController', OnEnterActionController)
        .directive('onEnterKey', onEnterKey);
})();

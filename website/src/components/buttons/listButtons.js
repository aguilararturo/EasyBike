(function() {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function listButtons() {
        return {
            restrict: 'E',
            templateUrl: 'components/buttons/listButtons.tpl.html',
            controller: 'ListButtonsController',
            controllerAs: 'lbCtrl',
            bindToController: {
                add: '&',
                remove: '&'
            }
        };
    }
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} _ Lodash lodash
     */
    function ListButtonsController() {
        var lbCtrl = this;
        /**
        * @function $onInit
        * @memberOf ListButtonsController
        * @desc Initializes controller
        */
        function $onInit() {
            console.log('listButtons');
        }

        lbCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.components')
        .controller('ListButtonsController', ListButtonsController)
        .directive('listButtons', listButtons);
})();

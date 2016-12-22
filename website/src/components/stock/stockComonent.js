(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function stockComonent() {
        return {
            restrict: 'E',
            templateUrl: 'components/user/userComp.tpl.html',
            controller: 'StockComonentController',
            controllerAs: 'stockCompCtrl',
            bindToController: {
                products: '=',
                title: '='
            },
            scope: true
        };
    }
    /**
     * @function StockComonentController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} _ Lodash lodash
     */
    function StockComonentController(_) {
        var stockCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {

        }

        stockCompCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('StockComonentController', StockComonentController)
        .directive('stockComonent', stockComonent);
})();

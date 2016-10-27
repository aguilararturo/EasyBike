(function() {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function orderPanel() {
        return {
            restrict: 'E',
            templateUrl: 'orders/panel/orderPanel.tpl.html',
            controller: 'OrderPanelController',
            controllerAs: 'orderPnlCtrl'
        };
    }
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} $element directive element
     * @param  {Object} $scope directive scope
     * @param  {Object} CatalogService catalog service
     * @param  {Object} SearchService search service
     * @param  {Object} BrandingModel Branding Model service
     * @param  {const} UTILS_CONSTANT used to go search state based on selected brand
     * @param  {const} DISPLAY_SIZES display size
     * @param  {Object} URLUtils util to validate the image url
     * @param  {Object} UtilityService Utility Service
     * @param  {Object} _ Lodash lodash
     */
    function OrderPanelController() {
        var ordersCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            console.log('init order panel');
        }


        ordersCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.orders')
        .controller('OrderPanelController', OrderPanelController)
        .directive('orderPanel', orderPanel);
})();

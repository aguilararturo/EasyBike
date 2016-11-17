(function() {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function productComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/product/productComp.tpl.html',
            controller: 'ProductComponetController',
            controllerAs: 'prodCompCtrl',
            bindToController: {
                product: '=',
                textTitle: '=',
                clickAction: '&?'
            },
            scope: true
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
    function ProductComponetController(_) {
        var prodCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            prodCompCtrl.hasAction = !_.isUndefined(prodCompCtrl.clickAction);

            console.log('prodCompCtrl');
        }

        function clickProduct() {
            if (prodCompCtrl.hasAction) {
                prodCompCtrl.clickAction(prodCompCtrl.product);
            }
        }
        prodCompCtrl.clickProduct = clickProduct;
        prodCompCtrl.$onInit = $onInit;

    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductComponetController', ProductComponetController)
        .directive('productComponent', productComponent);
})();

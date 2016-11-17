(function() {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function productCategoryComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/product/productCategory/productCategoryComp.tpl.html',
            controller: 'ProductCategoryComponetController',
            controllerAs: 'prodCatCompCtrl',
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
    function ProductCategoryComponetController(_, CommonService) {
        var prodCatCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            prodCatCompCtrl.hasAction = !_.isUndefined(prodCatCompCtrl.clickAction);
            CommonService.getProductCategories().then(loadCategories);
            console.log('prodCompCtrl');
            CommonService.getProducts().then(loadProducts);
        }

        function loadCategories(response) {
            prodCatCompCtrl.categories = _.mapValues(response,
                function(category) {
                    category.selected = false;
                    return category;
                });
        }

        function clickProduct() {
            if (prodCatCompCtrl.hasAction) {
                prodCatCompCtrl.clickAction(prodCatCompCtrl.product);
            }
        }
        function selectTab(cat) {
            prodCatCompCtrl.categories = _.mapValues(prodCatCompCtrl.categories,
                function(category) {
                    category.selected = false;
                    return category;
                });
            cat.selected = true;
        }

        function loadProducts(response) {
            prodCatCompCtrl.products = response;
        }

        prodCatCompCtrl.clickProduct = clickProduct;
        prodCatCompCtrl.$onInit = $onInit;
        prodCatCompCtrl.selectTab = selectTab;

    }
    angular
        .module('EasyBikeApp.User')
        .controller('ProductCategoryComponetController', ProductCategoryComponetController)
        .directive('productCategoryComponent', productCategoryComponent);
})();

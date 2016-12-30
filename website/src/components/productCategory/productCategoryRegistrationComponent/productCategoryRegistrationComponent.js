(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function productCategoryRegistrationComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/productCategory/productCategoryRegistrationComponent/productCategoryRegistrationComponent.tpl.html',
            controller: 'ProductCategoryRegistrationComponentController',
            controllerAs: 'prodCatRegCompCtrl',
            bindToController: {
                productCategory: '=',
                textTitle: '=',
                displaySaveAction: '='
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
    function ProductCategoryRegistrationComponentController(_, ProductCategoryService, $state, ModalUtility) {
        var prodCatRegCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {

        }

        function reloadThis() {
            ModalUtility.openSaveCompleteModal().result.then(
                function () {
                    $state.reload();
                });
        }

        function saveProductCategory(category) {
            ProductCategoryService.saveProductCategory(category).then(reloadThis);
        }

        prodCatRegCompCtrl.$onInit = $onInit;
        prodCatRegCompCtrl.saveProductCategory = saveProductCategory;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('ProductCategoryRegistrationComponentController', ProductCategoryRegistrationComponentController)
        .directive('productCategoryRegistrationComponent', productCategoryRegistrationComponent);
})();

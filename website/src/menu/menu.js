(function() {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function menuBar() {
        return {
            restrict: 'E',
            templateUrl: 'menu/menu.tpl.html',
            controller: 'MenuController',
            controllerAs: 'menuCtrl'
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
    function MenuController( CommonService) {
        var menuCtrl = this;
        menuCtrl.menuItems = {};
        console.log('MenuController');
        CommonService.getMenu().then(loadMenuItems);


        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            menuCtrl.menuItems = {};
            console.log('init');
            CommonService.getMenu().then(loadMenuItems);
        }

        function loadMenuItems(response) {
            menuCtrl.menuItems = response;
        }

        menuCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Menu')
        .controller('MenuController', MenuController)
        .directive('menuBar', menuBar);
        console.log('menuDirective');
})();

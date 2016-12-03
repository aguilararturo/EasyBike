(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function businessComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/business/businessComponent.tpl.html',
            controller: 'BusinessComponentController',
            controllerAs: 'businessCompCtrl',
            bindToController: {
                business: '=',
                selectionEnabled: '@',
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
    function BusinessComponentController(_) {
        var businessCompCtrl = this;

        function $onInit() {

        }

        function lunchAction() {
            if (businessCompCtrl.selectionEnabled) {
                businessCompCtrl.business.selected = true;
            }
            if (!_.isUndefined(businessCompCtrl.clickAction)) {
                businessCompCtrl.clickAction(businessCompCtrl.business);
            }
        }

        businessCompCtrl.$onInit = $onInit;
        businessCompCtrl.lunchAction = lunchAction;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('BusinessComponentController', BusinessComponentController)
        .directive('businessComponent', businessComponent);
})();

(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function bikeComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/bike/bikeComponent.tpl.html',
            controller: 'BikeComponetController',
            controllerAs: 'bikeCompCtrl',
            bindToController: {
                bike: '=',
                saveAction: '&'
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
    function BikeComponetController(_, BikeService) {
        var bikeCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            bikeCompCtrl.text = 'Datos Motociclista';
            bikeCompCtrl.submited = false;
            bikeCompCtrl.codeError = false;
        }

        function validateBike() {
            bikeCompCtrl.submited = true;
        }

        function validateCode(code) {
            function completeValidateCode(response) {
                bikeCompCtrl.codeError = !response;
            }

            function errorInValidateCode(response) {
                bikeCompCtrl.codeError = false;
            }
            BikeService.validateCode(code)
                .then(completeValidateCode)
                .catch(errorInValidateCode);
        }

        bikeCompCtrl.$onInit = $onInit;
        bikeCompCtrl.validateBike = validateBike;
        bikeCompCtrl.validateCode = validateCode;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikeComponetController', BikeComponetController)
        .directive('bikeComponent', bikeComponent);
})();

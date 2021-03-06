(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function phoneComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/phone/phoneComponent.tpl.html',
            controller: 'PhoneComponetController',
            controllerAs: 'phoneCompCtrl',
            bindToController: {
                phones: '='
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
    function PhoneComponetController(_) {
        var phoneCompCtrl = this;
        function initDummyPhone() {
            phoneCompCtrl.newPhone = {
                id: '',
                number: ''
            };
        }

        function $onInit() {
            initDummyPhone();
            if (_.isEmpty(phoneCompCtrl.phones)) {
                addPhone(phoneCompCtrl.newPhone);
            }
        }

        function removePhone(phone) {
            _.remove(phoneCompCtrl.phones, function removePhon(n) {
                return n.number === phone.number;
            });

            if (_.isEmpty(phoneCompCtrl.phones)) {
                addPhone(phoneCompCtrl.newPhone);
            }
        }

        function addPhone(phone) {
            phoneCompCtrl.phones.push(_.clone(phone));
            initDummyPhone();
        }

        phoneCompCtrl.$onInit = $onInit;
        phoneCompCtrl.addPhone = addPhone;
        phoneCompCtrl.removePhone = removePhone;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('PhoneComponetController', PhoneComponetController)
        .directive('phoneComponent', phoneComponent);
})();

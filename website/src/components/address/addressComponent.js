(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function addressComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/address/addressComponent.tpl.html',
            controller: 'AddressComponentController',
            controllerAs: 'addressCompCtrl',
            bindToController: {
                addresses: '='
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
    function AddressComponentController(_) {
        var addressCompCtrl = this;

        function $onInit() {
            initDummyAdress();
            if (_.isEmpty(addressCompCtrl.addresses)) {
                addAddress(addressCompCtrl.newAdress);
            }
        }

        function initDummyAdress() {
            addressCompCtrl.newAdress = {
                id: '',
                location: '',
                date: '',
                direction: ''
            };
        }


        function addAddress(address) {
            addressCompCtrl.addresses.push(_.clone(address));
            initDummyAdress();
        }

        function removeAddress(address) {
            _.remove(addressCompCtrl.addresses, function removeAddr(n) {
                return n.location === address.location;
            });
            if (_.isEmpty(addressCompCtrl.addresses)) {
                addAddress(addressCompCtrl.newAdress);
            }
        }

        addressCompCtrl.$onInit = $onInit;
        addressCompCtrl.addAddress = addAddress;
        addressCompCtrl.removeAddress = removeAddress;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('AddressComponentController', AddressComponentController)
        .directive('addressComponent', addressComponent);
})();

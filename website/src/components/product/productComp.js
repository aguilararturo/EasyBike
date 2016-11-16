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
                user: '=',
                textTitle: '=',
                saveAction: '&?'
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
            prodCompCtrl.displaySave = !_.isUndefined(prodCompCtrl.saveAction);
            initDummyPhone();
            initDummyAdress();
            console.log('userComp');
        }

        function initDummyPhone() {
            prodCompCtrl.newPhone = {
                id: '',
                number: ''
            };
        }

        function initDummyAdress() {
            prodCompCtrl.newAdress = {
                id: '',
                location: '',
                date: '',
                direction: ''
            };
        }

        function removePhone(phone) {
            _.remove(prodCompCtrl.user.phones, function removePhon(n) {
                return n.number === phone.number;
            });
        }

        function addAddress(address) {
            prodCompCtrl.user.addresses.push(_.clone(address));
            initDummyAdress();
        }

        function removeAddress(address) {
            _.remove(prodCompCtrl.user.addresses, function removeAddr(n) {
                return n.location === address.location;
            });
        }

        function addPhone(phone) {
            prodCompCtrl.user.phones.push(_.clone(phone));
            initDummyPhone();
        }

        prodCompCtrl.$onInit = $onInit;
        prodCompCtrl.addPhone = addPhone;
        prodCompCtrl.removePhone = removePhone;
        prodCompCtrl.addAddress = addAddress;
        prodCompCtrl.removeAddress = removeAddress;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('ProductComponetController', ProductComponetController)
        .directive('productComponent', productComponent);
})();

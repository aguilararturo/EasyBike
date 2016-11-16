(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function userComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/user/userComp.tpl.html',
            controller: 'UserComponetController',
            controllerAs: 'userCompCtrl',
            bindToController: {
                user: '='
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
    function UserComponetController(_) {
        var userCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            initDummyPhone();
            initDummyAdress();
            console.log('userComp');
        }

        function initDummyPhone() {
            userCompCtrl.newPhone = {
                id: '',
                number: ''
            };
        }

        function initDummyAdress() {
            userCompCtrl.newAdress = {
                id: '',
                location: ''
            };
        }

        function removePhone(phone) {
            _.remove(userCompCtrl.user.phones, function removePhone(n) {
                return n.number === phone.number;
            });

        }

        function addAddress(address) {
            userCompCtrl.user.addresses.push(_.clone(address));
            initDummyAdress();
        }

        function removeAddress(address) {
            _.remove(userCompCtrl.user.addresses, function removeAddress(n) {
                return n.location === address.location;
            });

        }

        function addPhone(phone) {
            userCompCtrl.user.phones.push(_.clone(phone));
            initDummyPhone();
        }

        userCompCtrl.$onInit = $onInit;
        userCompCtrl.addPhone = addPhone;
        userCompCtrl.removePhone = removePhone;
        userCompCtrl.addAddress = addAddress;
        userCompCtrl.removeAddress = removeAddress;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('UserComponetController', UserComponetController)
        .directive('userComponent', userComponent);
})();

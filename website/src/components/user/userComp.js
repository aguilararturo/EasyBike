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
                user: '=',
                textTitle: '=',
                saveAction: '&?',
                selectionAddressChange: '&?',
                saveText: '<',
                externalValidate: '&?'
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
    function UserComponetController(_, $q) {
        var userCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            userCompCtrl.displaySave = !_.isUndefined(userCompCtrl.saveAction);
            userCompCtrl.searchMode = !_.isUndefined(userCompCtrl.searchAction);
            userCompCtrl.selectionAddressEnabled = !_.isUndefined(userCompCtrl.selectionAddressChange);
            userCompCtrl.displayError = false;
            userCompCtrl.submited = false;
            userCompCtrl.errorPhone = false;
            userCompCtrl.errorAddress = false;
            initDummyPhone();
            initDummyAdress();
            if (_.isEmpty(userCompCtrl.saveText)) {
                userCompCtrl.saveText = 'Guardar Cliente';
            }
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
                location: '',
                date: '',
                direction: ''
            };
        }

        function removePhone(phone) {
            _.remove(userCompCtrl.user.phones, function removePhon(n) {
                return n.number === phone.number;
            });
        }

        function addAddress(address) {
            userCompCtrl.user.addresses.push(_.clone(address));
            initDummyAdress();
        }

        function removeAddress(address) {
            _.remove(userCompCtrl.user.addresses, function removeAddr(n) {
                return n.location === address.location;
            });
        }

        function addPhone(phone) {
            userCompCtrl.user.phones.push(_.clone(phone));
            initDummyPhone();
        }

        function validateUser() {
            function phoneIterator(phone) {
                return _.isNumber(phone.number);
            }
            function iterateAddress(address) {
                return !_.isEmpty(address.direction) && !_.isEmpty(address.location);
            }

            userCompCtrl.errorPhone = !_.every(userCompCtrl.user.phones, phoneIterator);

            userCompCtrl.errorAddress = !_.every(userCompCtrl.user.addresses, iterateAddress);

            return !userCompCtrl.errorAddress && !userCompCtrl.errorPhone;
        }

        function saveData(invalid) {
            userCompCtrl.submited = true;
            var deferrer = $q.defer();
            var validateFlag = validateUser();
            if (!_.isUndefined(userCompCtrl.externalValidate)) {
                userCompCtrl.externalValidate();
            }
            if (invalid || !validateFlag) {
                userCompCtrl.displayError = true;
                deferrer.reject();
            } else if (!_.isUndefined(userCompCtrl.saveAction)) {
                deferrer.resolve(userCompCtrl.saveAction());
            }
            return deferrer.promise;
        }

        userCompCtrl.$onInit = $onInit;
        userCompCtrl.addPhone = addPhone;
        userCompCtrl.removePhone = removePhone;
        userCompCtrl.addAddress = addAddress;
        userCompCtrl.removeAddress = removeAddress;
        userCompCtrl.saveData = saveData;
        userCompCtrl.validateUser = validateUser;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('UserComponetController', UserComponetController)
        .directive('userComponent', userComponent);
})();

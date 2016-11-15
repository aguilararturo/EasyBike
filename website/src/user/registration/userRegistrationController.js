(function() {
    'use strict';
    function UserRegistrationController(CommonService) {
        var userRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            userRegCtrl.user = {
                phones: [],
                name: '',
                nit: '',
                lastName: ''
            };
        }

        userRegCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('UserRegistrationController', UserRegistrationController);
})();

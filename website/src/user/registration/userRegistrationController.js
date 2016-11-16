(function() {
    'use strict';
    function UserRegistrationController(CommonService, ModalUtility) {
        var userRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            userRegCtrl.user = {
                id: 0,
                phones: [],
                name: '',
                nit: '',
                lastName: '',
                imageUrl: '',
                addresses: []
            };

            userRegCtrl.text = 'Datos Cliente';
        }

        function saveUser() {
            function saveSussess(response) {
                ModalUtility.openSaveCompleteModal();
            }
            CommonService.saveUser(userRegCtrl.user)
                .then(saveSussess);
        }

        userRegCtrl.$onInit = $onInit;
        userRegCtrl.saveUser = saveUser;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('UserRegistrationController', UserRegistrationController);
})();

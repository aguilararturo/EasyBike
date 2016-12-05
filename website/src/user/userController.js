(function() {
    'use strict';


    function UserController(CommonService) {
        var userCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            userCtrl.users = [];
            CommonService.getUser().then(loadMenuItems);
        }

        function loadMenuItems(response) {
            userCtrl.users = response;
        }


        userCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('UserController', UserController);
})();

(function() {
    'use strict';


    function ProductController(CommonService) {
        var prodCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            CommonService.getUser().then(loadMenuItems);
        }

        function loadMenuItems(response) {
            prodCtrl.users = response;
        }


        prodCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductController', ProductController);
})();

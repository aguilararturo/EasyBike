(function() {
    'use strict';


    function BusinessController(CommonService) {
        var busCtrl = this;

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
            busCtrl.users = response;
        }


        busCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Business')
        .controller('BusinessController', BusinessController);
})();

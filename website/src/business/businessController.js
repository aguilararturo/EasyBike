(function () {
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
            CommonService.getBusinesses().then(loadBusiness);
        }

        function loadBusiness(response) {
            busCtrl.businesses = response;

            console.log('busCtrl.businesses', busCtrl.businesses);
        }


        busCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Business')
        .controller('BusinessController', BusinessController);
})();

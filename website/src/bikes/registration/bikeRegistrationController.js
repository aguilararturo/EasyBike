(function() {
    'use strict';
    function BikeRegistrationController(CommonService) {
        var bikeRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            bikeRegCtrl.user = {
                phones: [],
                name: '',
                nit: '',
                lastName: '',
                addresses: []
            };

            
        }

        bikeRegCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikeRegistrationController', BikeRegistrationController);
})();

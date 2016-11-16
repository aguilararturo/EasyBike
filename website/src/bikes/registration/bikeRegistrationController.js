(function() {
    'use strict';
    function BikeRegistrationController(CommonService, ModalUtility) {
        var bikeRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            bikeRegCtrl.bike = {
                'id': 0,
                'code': '',
                'plate': '',
                'model': '',
                'driver': {
                    'id': 0,
                    'nit': '',
                    'phones': [],
                    'name': '',
                    'lastName': '',
                    'addresses': [],
                    'imageUrl': ''
                }
            };
        }

        function saveBike() {
            function completeSaveBike() {
                ModalUtility.openSaveCompleteModal();
            }
            CommonService.saveBike(bikeRegCtrl.bike).then(completeSaveBike);
        }

        bikeRegCtrl.$onInit = $onInit;
        bikeRegCtrl.saveBike = saveBike;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikeRegistrationController', BikeRegistrationController);
})();

(function() {
    'use strict';
    function BikeRegistrationController(BikeService, ModalUtility) {
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

            bikeRegCtrl.text = "Datos Motociclista";
        }

        function saveBike() {
            function completeSaveBike() {
                ModalUtility.openSaveCompleteModal();
            }
            BikeService.saveBike(bikeRegCtrl.bike).then(completeSaveBike);
        }

        bikeRegCtrl.$onInit = $onInit;
        bikeRegCtrl.saveBike = saveBike;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikeRegistrationController', BikeRegistrationController);
})();

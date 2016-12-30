(function () {
    'use strict';
    function BikeRegistrationController(BikeService, ModalUtility, $state) {
        var bikeRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            initBike();

            bikeRegCtrl.text = 'Datos Motociclista';
        }

        function initBike() {
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
                ModalUtility.openSaveCompleteModal().result.then(
                    function () {
                        $state.reload();
                    });
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

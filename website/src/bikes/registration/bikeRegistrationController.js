(function () {
    'use strict';
    function BikeRegistrationController(BikeService, ModalUtility, $state, $q) {
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
            var deferrer = $q.defer();
            function completeSaveBike() {
                $state.reload();
            }
            function completeValidateCode(response) {
                if (response) {
                    deferrer.resolve(BikeService.saveBike(bikeRegCtrl.bike).then(completeSaveBike));
                } else {
                    ModalUtility.openErrorMessage();
                    deferrer.reject();
                }
            }

            BikeService.validateCode(bikeRegCtrl.bike.code).then(completeValidateCode);

            return deferrer.promise;
        }

        bikeRegCtrl.$onInit = $onInit;
        bikeRegCtrl.saveBike = saveBike;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikeRegistrationController', BikeRegistrationController);
})();

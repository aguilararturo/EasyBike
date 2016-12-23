(function () {
    'use strict';
    function EnableBikeController(BikeService, ModalUtility) {
        var enableBikeCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            enableBikeCtrl.searchText = '';
            enableBikeCtrl.bike = {
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
            BikeService.getBikes().then(loadBikes);
        }
        function loadBikes(response) {
            enableBikeCtrl.bikes = response;
        }

        function saveBike() {
            function completeSaveBike() {
                ModalUtility.openSaveCompleteModal();
            }
            BikeService.saveBike(enableBikeCtrl.bike).then(completeSaveBike);
        }

        function searchBike() {

        }

        enableBikeCtrl.$onInit = $onInit;
        enableBikeCtrl.saveBike = saveBike;
        enableBikeCtrl.searchBike = searchBike;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('EnableBikeController', EnableBikeController);
})();

(function() {
    'use strict';


    function BikesController(BikeService, BikeEnabledService, ModalUtility) {
        var bikesCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            bikesCtrl.bikes = [];
            bikesCtrl.todayBikes = [];
            console.log('init bikesCtrl');
            reloadData();
        }

        function loadBikes(response) {
            bikesCtrl.bikes = response;
        }

        function loadTodayBikes(response) {
            var bikes = [];

            function filterBikes(regBike) {
                bikes.push(regBike.bike);
            }
            _.forEach(response, filterBikes);
            bikesCtrl.todayBikes = bikes;
        }

        function reloadData() {
            BikeService.getBikes().then(loadBikes);
            BikeEnabledService.getTodayBikes().then(loadTodayBikes);
        }

        bikesCtrl.$onInit = $onInit;
        bikesCtrl.reloadData = reloadData;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikesController', BikesController);
})();

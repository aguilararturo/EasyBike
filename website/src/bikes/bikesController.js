(function() {
    'use strict';


    function BikesController() {
        var bikesCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            bikesCtrl.bikes = [{
                model: '2010',
                conductor: 'Jose Lopez',
                state: 'Transito',
                pedidos: '30'
            },
            {
                model: '2012',
                conductor: 'Angel Cosio',
                state: 'Transito',
                pedidos: '40'
            },
            {
                model: '2008',
                conductor: 'Mauricio Vargas',
                state: 'Fuera de Servicio',
                pedidos: '10'
            },
            {
                model: '2015',
                conductor: 'Andres Torrico',
                state: 'Libre',
                pedidos: '120'
            }];
            console.log('init bikesCtrl');
        }


        bikesCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikesController', BikesController);
})();

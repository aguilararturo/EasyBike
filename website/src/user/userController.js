(function() {
    'use strict';


    function UserController(CommonService) {
        var userCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            userCtrl.users = [{
                membrecia: 'Gold',
                name: 'Jose Lopez',
                direccion: 'Circuito bolivia',
                pedidos: '180'
            },
            {
                membrecia: 'Platinium',
                name: 'Angel Cosio',
                direccion: 'Calle antofagasta',
                pedidos: '40'
            },
            {
                membrecia: 'Gold',
                name: 'Mauricio Vargas',
                direccion: 'Servicio de Caminos',
                pedidos: '50'
            },
            {
                membrecia: 'Silver',
                name: 'Andres Torrico',
                direccion: 'Calama #240',
                pedidos: '120'
            }];
            console.log('init bikesCtrl');
            CommonService.getUser().then(loadMenuItems);
        }

        function loadMenuItems(response) {
            userCtrl.users = response;
        }


        userCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('UserController', UserController);
})();

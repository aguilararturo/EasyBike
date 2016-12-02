(function () {
    'use strict';
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} $element directive element
     * @param  {Object} $scope directive scope
     * @param  {Object} CatalogService catalog service
     * @param  {Object} SearchService search service
     * @param  {Object} BrandingModel Branding Model service
     * @param  {const} UTILS_CONSTANT used to go search state based on selected brand
     * @param  {const} DISPLAY_SIZES display size
     * @param  {Object} URLUtils util to validate the image url
     * @param  {Object} UtilityService Utility Service
     * @param  {Object} _ Lodash lodash
     */
    function OrdersController(CommonService) {
        var ordersCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ordersCtrl.userEnable = false;
            ordersCtrl.oderTypeEnable = false;
            ordersCtrl.cartEnable = false;
            ordersCtrl.bikeEnable = false;
            ordersCtrl.user = {
                phones: [],
                addresses: []
            };

            ordersCtrl.selectedStep = {};

            ordersCtrl.steps = [
                {
                    key: 'home',
                    value: 'Orden'
                },
                {
                    key: 'Usuario',
                    value: 'Usuario'
                },
                {
                    key: 'order',
                    value: 'Pedido'
                },
                {
                    key: 'bike',
                    value: 'Moto'
                }

            ];

            ordersCtrl.userTitle = "Datos Usuario";
            ordersCtrl.number = '';

            ordersCtrl.orderType = {
                title: 'Tipo de orden',
                content: 'fa fa-home',
                number: '1',
                description: 'Mostrar',
                color: 'panel-primary'
            };
            ordersCtrl.userType = {
                title: 'Usuario',
                content: 'fa fa-user',
                number: '2',
                description: 'Mostrar',
                color: 'panel-yellow'
            };
            ordersCtrl.cartType = {
                title: 'Pedido',
                content: 'fa fa-shopping-cart',
                number: '3',
                description: 'Mostrar',
                color: 'panel-green'
            };
            ordersCtrl.bikeType = {
                title: 'Moto',
                content: 'fa fa-road',
                number: '4',
                description: 'Mostrar',
                color: 'panel-red'
            };
            console.log('init ordersCtrl');
        }

        function displayUser() {
            ordersCtrl.userEnable = true;
            ordersCtrl.oderTypeEnable = false;
            ordersCtrl.cartEnable = false;
            ordersCtrl.bikeEnable = false;
        }

        function displayOrders() {
            ordersCtrl.userEnable = false;
            ordersCtrl.oderTypeEnable = true;
            ordersCtrl.cartEnable = false;
            ordersCtrl.bikeEnable = false;
        }

        function displayCart() {
            ordersCtrl.userEnable = false;
            ordersCtrl.oderTypeEnable = false;
            ordersCtrl.cartEnable = true;
            ordersCtrl.bikeEnable = false;
        }

        function displayBike() {
            ordersCtrl.userEnable = false;
            ordersCtrl.oderTypeEnable = false;
            ordersCtrl.cartEnable = false;
            ordersCtrl.bikeEnable = true;
        }

        function loadUser(response) {
            ordersCtrl.user = response;
        }

        function searchUser(number) {
            console.log('search User', number);
            CommonService.getUserByPhone(number).then(loadUser);
        }

        ordersCtrl.displayUser = displayUser;
        ordersCtrl.displayOrders = displayOrders;
        ordersCtrl.displayCart = displayCart;
        ordersCtrl.displayBike = displayBike;
        ordersCtrl.searchUser = searchUser;
        ordersCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.orders')
        .controller('OrdersController', OrdersController);
})();

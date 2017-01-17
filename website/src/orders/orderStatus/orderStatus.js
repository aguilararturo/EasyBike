(function () {
    'use strict';

    function OrdersStatusController(_, ProductService, StockService, $q, ModalUtility, OrderService, $state, BikeEnabledService) {
        var ordersStatusCtrl = this;
        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ordersStatusCtrl.currentDate = new Date();
            ordersStatusCtrl.displayBikes = false;
            ordersStatusCtrl.displayDelivery = false;
            ordersStatusCtrl.orders = [];
            ordersStatusCtrl.bikes = {};
            OrderService.getTodayInTransit().then(loadOrdersStatus);
        }

        function selectDeliverOrders() {
            ordersStatusCtrl.displayDelivery = true;
            OrderService.getOrders().then(loadOrdersStatus);
        }

        function loadOrdersStatus(response) {
            ordersStatusCtrl.orders = response;
        }

        function deliverOrder(order) {
            var okeyKey = 'Entregada la orden: ' + order.id;
            var modResult = ModalUtility.openAskDeliverOrderModal(okeyKey);
            modResult.result.then(closemod);

            function closemod(option) {
                if (option.btn === okeyKey) {
                    order.bikePrice = option.price;
                    OrderService.deliverOrder(order).then(
                        function completeSave() {
                            ModalUtility.openSaveCompleteModal().result.then(
                                function () {
                                    $state.reload();
                                });
                        }
                    );
                }
            }
        }

        function addBikeToOrder(order) {
            ordersStatusCtrl.dumpOrders = _.clone(ordersStatusCtrl.orders);
            ordersStatusCtrl.orders = [order];
            BikeEnabledService.getTodayAvaliableWithouOrder().then(loadTodayBikes);
        }

        function loadTodayBikes(response) {
            ordersStatusCtrl.displayBikes = true;
            var bikes = [];

            function filterBikes(regBike) {
                bikes.push(regBike.bike);
            }
            _.forEach(response, filterBikes);
            ordersStatusCtrl.bikes = bikes;
        }

        function completeSaveOrder() {
            ModalUtility.openSaveCompleteModal();
            $state.reload();
        }

        function selectionBikeChange() {
            function setSelectionBike(bike) {
                bike.selected = false;
            }
            function findSelectedBike(bike) {
                return bike.selected;
            }
            var selectedBike = _.find(ordersStatusCtrl.bikes, findSelectedBike);
            var order = ordersStatusCtrl.orders[0];
            order.bike = selectedBike;

            function closemod(option) {
                if (option === okeyKey) {
                    OrderService.setBike(order).then(completeSaveOrder);
                } else {
                    _.forEach(ordersStatusCtrl.bikes, setSelectionBike);
                }
            }

            var okeyKey = 'Asignar La Motocicleta ' + selectedBike.id;
            var modResult = ModalUtility.openAskOrderBikeModal(order, okeyKey);
            modResult.result.then(closemod);
        }

        function cancel() {
            ordersStatusCtrl.displayBikes = false;
            ordersStatusCtrl.orders = ordersStatusCtrl.dumpOrders;
        }

        function loadOrders() {
            ordersStatusCtrl.displayDelivery = false;
            OrderService.getTodayInTransit().then(loadOrdersStatus);
        }

        ordersStatusCtrl.$onInit = $onInit;
        ordersStatusCtrl.deliverOrder = deliverOrder;
        ordersStatusCtrl.addBikeToOrder = addBikeToOrder;
        ordersStatusCtrl.selectionBikeChange = selectionBikeChange;
        ordersStatusCtrl.cancel = cancel;
        ordersStatusCtrl.selectDeliverOrders = selectDeliverOrders;
        ordersStatusCtrl.loadOrders = loadOrders;
    }
    angular
        .module('EasyBikeApp.Orders')
        .controller('OrdersStatusController', OrdersStatusController);
})();

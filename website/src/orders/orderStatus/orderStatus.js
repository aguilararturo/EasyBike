(function () {
    'use strict';

    function OrdersStatusController(_, ProductService, StockService, $q, ModalUtility, OrderService, $state) {
        var ordersStatusCtrl = this;
        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ordersStatusCtrl.orders = [];
            OrderService.getTodayInTransit().then(loadOrdersStatus);
        }

        function loadOrdersStatus(response) {
            ordersStatusCtrl.orders = response;
        }

        function deliverOrder(order) {
            var okeyKey = 'Entregada la orden: ' + order.id;
            var modResult = ModalUtility.openAskDeliverOrderModal(okeyKey);
            modResult.result.then(closemod);

            function closemod(option) {
                if (option === okeyKey) {
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

        ordersStatusCtrl.$onInit = $onInit;
        ordersStatusCtrl.deliverOrder = deliverOrder;
    }
    angular
        .module('EasyBikeApp.Orders')
        .controller('OrdersStatusController', OrdersStatusController);
})();

(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function orderDetail() {
        return {
            restrict: 'E',
            templateUrl: 'components/order/orderDetail.tpl.html',
            controller: 'OrderDetailController',
            controllerAs: 'orderDtlCtr',
            bindToController: {
                orderProducts: '='
            },
            scope: true
        };
    }

    function OrderDetailController(_) {
        var orderDtlCtr = this;

        function $onInit() {

        }

        function getTotal() {
            var total = 0;
            function sumTotal(item) {
                total = total + (item.product.price * item.quantity);
            }
            if (!_.isUndefined(orderDtlCtr.orderProducts)) {
                _.forEach(orderDtlCtr.orderProducts, sumTotal);
            }
            return total;
        }

        orderDtlCtr.$onInit = $onInit;
        orderDtlCtr.getTotal = getTotal;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('OrderDetailController', OrderDetailController)
        .directive('orderDetail', orderDetail);
})();

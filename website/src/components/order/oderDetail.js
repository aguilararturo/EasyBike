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

        function removeProduct(orderDetail) {
            _.remove(phoneCompCtrl.orderProducts, function removeOrderDetail(od) {
                return od.product.codSubfix === orderDetail.product.codSubfix;
            });
        }

        phoneCompCtrl.$onInit = $onInit;
        phoneCompCtrl.removeProduct = removeProduct;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('OrderDetailController', OrderDetailController)
        .directive('orderDetail', orderDetail);
})();

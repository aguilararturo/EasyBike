(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function addOrderDetail() {
        return {
            restrict: 'E',
            templateUrl: 'components/order/addOrderDetail/addOrderDetail.tpl.html',
            controller: 'AddOrderDetailController',
            controllerAs: 'addOrderDtlCtr',
            bindToController: {
                orderProduct: '=',
                cancelAction: '&?',
                aceptAction: '&?'
            },
            scope: true
        };
    }

    function AddOrderDetailController(_) {
        var addOrderDtlCtr = this;

        function $onInit() {

        }

        function okAction() {
            if (!_.isUndefined(addOrderDtlCtr.aceptAction)) {
                addOrderDtlCtr.aceptAction(addOrderDtlCtr.orderProduct);
            }
        }

        function cancel() {
            if (!_.isUndefined(addOrderDtlCtr.cancelAction)) {
                addOrderDtlCtr.cancelAction(addOrderDtlCtr.orderProduct);
            }
        }

        function plusQuantity() {
            addOrderDtlCtr.orderProduct.quantity += 1;
        }

        function minusQuantity() {
            addOrderDtlCtr.orderProduct.quantity -= 1;

            if (addOrderDtlCtr.orderProduct.quantity <= 0) {
                addOrderDtlCtr.orderProduct.quantity = 0;
            }
        }

        addOrderDtlCtr.$onInit = $onInit;
        addOrderDtlCtr.okAction = okAction;
        addOrderDtlCtr.cancel = cancel;
        addOrderDtlCtr.plusQuantity = plusQuantity;
        addOrderDtlCtr.minusQuantity = minusQuantity;
    }

    angular
        .module('EasyBikeApp.Components')
        .controller('AddOrderDetailController', AddOrderDetailController)
        .directive('addOrderDetail', addOrderDetail);
})();

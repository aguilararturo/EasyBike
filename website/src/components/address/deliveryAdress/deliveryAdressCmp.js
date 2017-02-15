(function () {
    'use strict';

    function deliveryAdressCmp() {
        return {
            restrict: 'E',
            templateUrl: 'components/address/deliveryAdress/deliveryAdressCmp.tpl.html',
            controller: 'DeliveryAdressCmpController',
            controllerAs: 'deliveryAdrCmpCtrl',
            bindToController: {
                orderDelivery: '=',
                onDirectionChange: '&?'
            },
            scope: true
        };
    }

    function DeliveryAdressCmpController(_) {
        var deliveryAdrCmpCtrl = this;

        function $onInit() {
            initDummyAdress();
        }

        function initDummyAdress() {
            deliveryAdrCmpCtrl.addresses = [deliveryAdrCmpCtrl.orderDelivery.deliveryAddress];
        }

        deliveryAdrCmpCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('DeliveryAdressCmpController', DeliveryAdressCmpController)
        .directive('deliveryAdressCmp', deliveryAdressCmp);
})();

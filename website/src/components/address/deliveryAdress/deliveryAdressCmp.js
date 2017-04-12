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
                onDirectionChange: '&?',
                buttoms: '<',
                clientAddresses: '<',
                deliveryAddresses: '<',
                pickAddresses: '<',
                pickIcon: '<',
                deliveryIcon: '<'
            },
            scope: true
        };
    }

    function DeliveryAdressCmpController(_, $scope) {
        var deliveryAdrCmpCtrl = this;

        function $onInit() {
            initDummyAdress();
        }

        function initDummyAdress() {
            if (!_.isUndefined(deliveryAdrCmpCtrl.orderDelivery)) {
                console.log('initDummyAdress');
                deliveryAdrCmpCtrl.addresses = [deliveryAdrCmpCtrl.orderDelivery.address];
            }
        }

        function getOrderDelivery() {
            return deliveryAdrCmpCtrl.orderDelivery.address;
        }

        function propagateOnChange(item) {
            if (!_.isUndefined(deliveryAdrCmpCtrl.onDirectionChange)) {
                deliveryAdrCmpCtrl.onDirectionChange()(item);
            }
        }

        $scope.$watch(getOrderDelivery, initDummyAdress);

        deliveryAdrCmpCtrl.$onInit = $onInit;
        deliveryAdrCmpCtrl.propagateOnChange = propagateOnChange;

    }
    angular
        .module('EasyBikeApp.Components')
        .controller('DeliveryAdressCmpController', DeliveryAdressCmpController)
        .directive('deliveryAdressCmp', deliveryAdressCmp);
})();

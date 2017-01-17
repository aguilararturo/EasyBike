(function () {
    'use strict';

    /**
     * @class MessageModalController
     * @author Mauricio Terceros
     * @desc The controller for Message Modal.
     * @param {Object} $uibModalInstance current modal instance.
     * @param {Array} MESSAGE List of texts to be displayed as content of the dialog.
     * @param {Array} BUTTON_TEXT List of button objects.
     * @param {String} TITLE Title of the dialog.
     * @param {String} TITLE_ICON String that contains icon's classes.
     */
    function PriceModalController($uibModalInstance, MESSAGE, OK_BTN_TEXT, TITLE, PRICE_TITLE, CANCEL_BTN_TITLE) {
        var priceModalCtrl = this;

        /**
         * @function buttonCommandExecuted
         * @memberOf MessageModalController
         * @desc This method will close the modal return the button text as part of the closing promise.
         * @param {Object} buttonText The button text
         */
        function buttonCommandExecuted(buttonText) {
            $uibModalInstance.close({ btn: buttonText, price: priceModalCtrl.price });
        }

        function $onInit() {
            priceModalCtrl.price = 0;
        }

        function plusQuantity() {
            priceModalCtrl.price += 1;
        }

        function minusQuantity() {
            priceModalCtrl.price -= 1;

            if (priceModalCtrl.price <= 0) {
                priceModalCtrl.price = 0;
            }
        }

        priceModalCtrl.title = TITLE;
        priceModalCtrl.priceTitle = PRICE_TITLE;
        priceModalCtrl.messages = MESSAGE;
        priceModalCtrl.okbtnText = OK_BTN_TEXT;
        priceModalCtrl.cancelbtnText = CANCEL_BTN_TITLE;
        priceModalCtrl.buttonCommandExecuted = buttonCommandExecuted;
        $onInit();

        priceModalCtrl.plusQuantity = plusQuantity;
        priceModalCtrl.minusQuantity = minusQuantity;
    }

    angular
        .module('EasyBikeApp.Modals')
        .controller('PriceModalController', PriceModalController);
})();

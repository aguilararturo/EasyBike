(function() {
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
    function MessageModalController($uibModalInstance, MESSAGE, BUTTON_TEXT, TITLE, TITLE_ICON) {
        var messageModalCtrl = this;

        /**
         * @function buttonCommandExecuted
         * @memberOf MessageModalController
         * @desc This method will close the modal return the button text as part of the closing promise.
         * @param {Object} buttonText The button text
         */
        function buttonCommandExecuted(buttonText) {
            $uibModalInstance.close(buttonText);
        }

        messageModalCtrl.titleIcon = TITLE_ICON;
        messageModalCtrl.title = TITLE;
        messageModalCtrl.messages = MESSAGE;
        messageModalCtrl.buttonText = BUTTON_TEXT;
        messageModalCtrl.buttonCommandExecuted = buttonCommandExecuted;
    }

    angular
        .module('EasyBikeApp.Modals')
        .controller('MessageModalController', MessageModalController);
})();

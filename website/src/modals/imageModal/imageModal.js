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
    function ImageController($uibModalInstance, MESSAGE, BUTTON_TEXT, TITLE, TITLE_ICON) {
        var imageModalCtrl = this;

        /**
         * @function buttonCommandExecuted
         * @memberOf MessageModalController
         * @desc This method will close the modal return the button text as part of the closing promise.
         * @param {Object} buttonText The button text
         */
        function buttonCommandExecuted(buttonText) {
            $uibModalInstance.close(buttonText);
        }

        imageModalCtrl.titleIcon = TITLE_ICON;
        imageModalCtrl.title = TITLE;
        imageModalCtrl.message = MESSAGE;
        imageModalCtrl.buttonText = BUTTON_TEXT;
        imageModalCtrl.buttonCommandExecuted = buttonCommandExecuted;
    }

    angular
        .module('EasyBikeApp.Modals')
        .controller('ImageController', ImageController);
})();

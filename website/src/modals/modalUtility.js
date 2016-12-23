(function () {
    'use strict';

    /**
     * @class ModalUtility
     * @author Mauricio Terceros
     * @desc Contains ulities for modals such as open new modals.
     * @param {Object} $uibModal utility to manage bootstrap modals.
     * @param {Object} $log to add logs to console.
     * @param {Object} _ utility library.
     * @param {Object} CONFIGURATION information shared from server.
     */
    function ModalUtility($uibModal, $log, _) {
        /**
         * @function openMessage
         * @memberof ModalUtility
         * @author Mauricio Terceros
         * @desc Will open a message modal.
         * @param {Object[]|String} messageArray The message in the modal window.
         * @param {String} buttonArraryText The text that in the modal window.
         * @param {String} title The title in the modal window.
         * @param {String} tileIcon The title icon in the modal window.
         * @returns {Object} The message modal.
         */
        function openMessage(messageArray, buttonArraryText, title, tileIcon) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'modals/messageModal/messageModal.tpl.html',
                controller: 'MessageModalController',
                controllerAs: 'messageModalCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    MESSAGE: function () {
                        var updatedMessageArray = messageArray;
                        if (!_.isNull(messageArray) && !_.isArray(messageArray)) {
                            updatedMessageArray = [{
                                text: messageArray
                            }];
                        }
                        return updatedMessageArray;
                    },
                    BUTTON_TEXT: function () {
                        var updatedButtonArrayText = buttonArraryText;
                        if (!_.isNull(buttonArraryText) && !_.isArray(buttonArraryText)) {
                            updatedButtonArrayText = [{
                                text: buttonArraryText,
                                class: 'btn btn-default btn-success btn-all-width'
                            }];
                        }
                        return updatedButtonArrayText;
                    },
                    TITLE: function () {
                        return title;
                    },
                    TITLE_ICON: function () {
                        return tileIcon;
                    }
                }
            });
        }

        /**
         * @function openExpiredSessionModal
         * @memberof ModalUtility
         * @author Mauricio Terceros
         * @desc Opens an expiration message modal.
         * @returns {Object} The message modal.
         */
        function openExpiredSessionModal() {
            var msg = 'For your safety, we have logged you out of your account due to inactivity. Please log in again.';
            return openMessage(msg, 'CONTINUE', 'Session Time Out');
        }

        /**
         * @function openSaveCompleteModal
         * @memberof ModalUtility
         * @author Arturo Aguilar
         * @desc Save complete message.
         * @returns {Object} The message modal.
         */
        function openSaveCompleteModal() {
            var msg = 'Los Datos se guardaron correctamente';
            return openMessage(msg, [
                {
                    text: 'Aceptar',
                    class: 'btn btn-default btn-success col-xs-12'
                }
            ], msg);
        }

        function openVerifyOrdenData() {
            var msg = 'No se puede guardar la orden Por favor verifique todos los datos necesarios';
            return openMessage(msg, [
                {
                    text: 'Aceptar',
                    class: 'btn btn-default btn-success col-xs-12'
                }
            ], msg);
        }

        function openVerifyStockData() {
            var msg = 'No se puede guardar el Stock Por favor verifique todos los datos necesarios';
            return openMessage(msg, [
                {
                    text: 'Aceptar',
                    class: 'btn btn-default btn-success col-xs-12'
                }
            ], msg);
        }

        /**
         * @function openSaveCompleteModal
         * @memberof ModalUtility
         * @author Arturo Aguilar
         * @desc Save complete message.
         * @returns {Object} The message modal.
         */
        function openAskEnableBikeModal(placa, key) {
            var msg = 'Usted desea habilitar la motocicleta ' + placa;
            return openMessage(msg, [
                {
                    text: key,
                    class: 'btn btn-default btn-success col-xs-6'
                },
                {
                    text: 'Cancelar',
                    class: 'btn btn-default btn-Error col-xs-6'
                }
            ], msg);
        }

        function openGenericError() {
            var messages = [
                {
                    text: 'An error occurred while processing your request and we were unable to complete the action. ' +
                    'Please try again or call customer support at:'
                },
                {
                    text: '<b>' + 'ERROR GENERIC' + '</b>'
                }
            ];
            openMessage(messages, 'Okay', 'Error');
        }

        return {
            openGenericError: openGenericError,
            openMessage: openMessage,
            openExpiredSessionModal: openExpiredSessionModal,
            openSaveCompleteModal: openSaveCompleteModal,
            openAskEnableBikeModal: openAskEnableBikeModal,
            openVerifyOrdenData: openVerifyOrdenData,
            openVerifyStockData: openVerifyStockData
        };
    }

    angular
        .module('EasyBikeApp.Modals')
        .factory('ModalUtility', ModalUtility);
})();

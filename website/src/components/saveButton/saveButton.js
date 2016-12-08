(function () {
    'use strict';

    function saveButton() {
        return {
            restrict: 'E',
            templateUrl: 'components/saveButton/saveButton.tpl.html',
            controller: 'SaveButtonController',
            controllerAs: 'saveBtnCtrl',
            bindToController: {
                textTitle: '=',
                clickAction: '&?',
                saveMessage: '<'
            },
            scope: true
        };
    }

    function SaveButtonController(ModalUtility, _) {
        var saveBtnCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            saveBtnCtrl.disabled = false;  
        }

        function enableButton() {
            ModalUtility.openSaveCompleteModal();
            saveBtnCtrl.disabled = false;            
        }

        function saveAction() {
            saveBtnCtrl.disabled = true;
            if (!_.isUndefined(saveBtnCtrl.clickAction)) {
                saveBtnCtrl.clickAction().then(enableButton);
            }
        }
        saveBtnCtrl.enableButton=enableButton;
        saveBtnCtrl.saveAction = saveAction;
        saveBtnCtrl.$onInit = $onInit;

    }
    angular
        .module('EasyBikeApp.Components')
        .controller('SaveButtonController', SaveButtonController)
        .directive('saveButton', saveButton);
})();

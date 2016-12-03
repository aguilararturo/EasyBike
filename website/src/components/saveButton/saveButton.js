(function () {
    'use strict';

    function saveButtom() {
        return {
            restrict: 'E',
            templateUrl: 'components/saveButton/saveButton.tpl.html',
            controller: 'SaveButtomController',
            controllerAs: 'saveBtnCtrl',
            bindToController: {
                textTitle: '=',
                clickAction: '&?'
            },
            scope: true
        };
    }

    function SaveButtomController(_) {
        var saveBtnCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            enableButton();
        }

        function enableButton() {
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
        .controller('SaveButtomController', SaveButtomController)
        .directive('saveButtom', saveButtom);
})();

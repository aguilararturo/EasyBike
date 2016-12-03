(function() {
    'use strict';
    function BusinessRegistrationController(CommonService, BussinessService, ModalUtility) {
        var busRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller for Product
         * @author Arturo Aguilar
         */
        function $onInit() {
            busRegCtrl.displaySave = true;
            busRegCtrl.bussines =
                {
                    id: 0,
                    codSubfix: "",
                    name: "",
                    addresses: [{
                        id: 0,
                        location: "",
                        date: "",
                        direction: "",
                        number: 0
                    }],
                    phones: [
                        {
                            id: 0,
                            number: ''
                        }
                    ],
                    imageUrl: "",
                    categories:[]
                };

            busRegCtrl.textTitle = 'Datos Empresa';
        }

        function saveAction() {
            function completeSave() {
                ModalUtility.openSaveCompleteModal();
            }
            BussinessService.saveBusiness(busRegCtrl.bussines).then(completeSave);
        }

        busRegCtrl.$onInit = $onInit;
        busRegCtrl.saveAction = saveAction;
    }
    angular
        .module('EasyBikeApp.Business')
        .controller('BusinessRegistrationController', BusinessRegistrationController);
})();

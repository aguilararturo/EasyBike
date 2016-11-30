(function() {
    'use strict';
    function BusinessRegistrationController(CommonService, ModalUtility) {
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
                    Categories:[]
                };

            busRegCtrl.textTitle = 'Datos Empresa';
        }

        function saveProduct() {
            function saveSussess(response) {
                ModalUtility.openSaveCompleteModal();
            }
            CommonService.saveProduct(busRegCtrl.user)
                .then(saveSussess);
        }

        function saveAction() {
            function completeSave() {
                ModalUtility.openSaveCompleteModal();
            }
            CommonService.saveBusiness(busRegCtrl.bussines).then(completeSave);
        }

        busRegCtrl.$onInit = $onInit;
        busRegCtrl.saveProduct = saveProduct;
        busRegCtrl.saveAction = saveAction;
    }
    angular
        .module('EasyBikeApp.Business')
        .controller('BusinessRegistrationController', BusinessRegistrationController);
})();

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
            busRegCtrl.user = {
                id: 0,
                phones: [],
                name: '',
                nit: '',
                lastName: '',
                imageUrl: '',
                addresses: []
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

        busRegCtrl.$onInit = $onInit;
        busRegCtrl.saveProduct = saveProduct;
    }
    angular
        .module('EasyBikeApp.Business')
        .controller('BusinessRegistrationController', BusinessRegistrationController);
})();

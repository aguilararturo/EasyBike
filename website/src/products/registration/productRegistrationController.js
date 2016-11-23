(function() {
    'use strict';
    function ProductRegistrationController(CommonService, ModalUtility) {
        var prodRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller for Product
         * @author Arturo Aguilar
         */
        function $onInit() {
            prodRegCtrl.user = {
                id: 0,
                phones: [],
                name: '',
                nit: '',
                lastName: '',
                imageUrl: '',
                addresses: []
            };

            prodRegCtrl.text = 'Datos Cliente';
        }

        function saveProduct() {
            function saveSussess(response) {
                ModalUtility.openSaveCompleteModal();
            }
            CommonService.saveProduct(prodRegCtrl.user)
                .then(saveSussess);
        }

        prodRegCtrl.$onInit = $onInit;
        prodRegCtrl.saveProduct = saveProduct;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductRegistrationController', ProductRegistrationController);
})();

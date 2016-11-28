(function () {
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
            prodRegCtrl.product =
                {
                    id: 0,
                    codSubfix: '',
                    name: '',
                    pictureUrl: '',
                    brand: '',
                    barCode: '',
                    category: {

                    },
                    restorant: {},
                    phones: [

                    ],
                    imageUrl: ''
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

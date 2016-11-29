(function () {
    'use strict';
    function ProductCategoryRegistrationController(CommonService, ModalUtility) {
        var prodCatRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller for Product
         * @author Arturo Aguilar
         */
        function $onInit() {
            prodCatRegCtrl.productCategory = {
                id: 0,
                name: '',
                imageUrl: ''
            };

            prodCatRegCtrl.text = 'Datos Cliente';
        }

        function saveProduct() {
            function saveSussess(response) {
                ModalUtility.openSaveCompleteModal();
            }
            CommonService.saveProductCategory(prodCatRegCtrl.productCategory)
                .then(saveSussess);
        }

        prodCatRegCtrl.$onInit = $onInit;
        prodCatRegCtrl.saveProduct = saveProduct;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductCategoryRegistrationController', ProductCategoryRegistrationController);
})();

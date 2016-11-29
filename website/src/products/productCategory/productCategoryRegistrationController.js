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
                ImageUrl: '',
                default: false
            };

            prodCatRegCtrl.text = 'Datos Cliente';
        }

        prodCatRegCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductCategoryRegistrationController', ProductCategoryRegistrationController);
})();

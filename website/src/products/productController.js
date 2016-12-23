(function () {
    'use strict';


    function ProductController(CommonService, ProductService) {
        var prodCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            CommonService.getUser().then(loadMenuItems);
            ProductService.getStockProducts().then(loadStockProducts);
            prodCtrl.stocks = [];
            prodCtrl.products = [];
        }

        function loadStockProducts(response) {
            prodCtrl.products = response;
        }

        function loadMenuItems(response) {
            prodCtrl.users = response;
        }

        prodCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductController', ProductController);
})();

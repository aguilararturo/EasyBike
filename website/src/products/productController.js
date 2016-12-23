(function () {
    'use strict';


    function ProductController(CommonService, StockService) {
        var prodCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            StockService.getStockProductsQuantity().then(loadStockProducts);
            prodCtrl.stocks = [];
            prodCtrl.products = [];
        }

        function loadStockProducts(response) {
            prodCtrl.stocks = response;
        }


        prodCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductController', ProductController);
})();

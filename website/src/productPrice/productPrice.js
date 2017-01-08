(function () {
    'use strict';

    function ProductPriceController(_, ProductService, ProductPriceService, $q, ModalUtility, $state) {
        var productPriceCtrl = this;
        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ProductService.getStockProducts().then(loadStockProducts);
            productPriceCtrl.stocks = [];
            productPriceCtrl.products = [];
        }

        function loadStockProducts(response) {
            productPriceCtrl.products = response;        
        }

        function isValidated() {
            return true;
        }

        function completeSave() {
            $state.reload();
        }

        function savePrices() {
            var deferred = $q.defer();
            if (isValidated()) {
                deferred.resolve(ProductPriceService.savePrices(productPriceCtrl.stocks).then(completeSave));
            } else {
                ModalUtility.openVerifyStockData();
                deferred.reject();
            }

            return deferred.promise;
        }

        productPriceCtrl.$onInit = $onInit;
        productPriceCtrl.savePrices = savePrices;
    }
    angular
        .module('EasyBikeApp.ProductPrice')
        .controller('ProductPriceController', ProductPriceController);
})();

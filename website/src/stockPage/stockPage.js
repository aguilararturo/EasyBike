(function () {
    'use strict';

    function StockPageController(_, ProductService, StockService, $q, ModalUtility, $state) {
        var stockPageCtrl = this;
        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ProductService.getStockProducts().then(loadStockProducts);
            stockPageCtrl.stocks = [];
            stockPageCtrl.products = [];
        }

        function loadStockProducts(response) {
            stockPageCtrl.products = response;
        }

        function isValidated() {
            return true;
        }

        function completeSave() {
            $state.reload();
        }

        function saveStock() {
            var deferred = $q.defer();
            if (isValidated()) {
                deferred.resolve(StockService.saveStocks(stockPageCtrl.stocks).then(completeSave));
            } else {
                ModalUtility.openVerifyStockData();
                deferred.reject();
            }

            return deferred.promise;
        }

        stockPageCtrl.$onInit = $onInit;
        stockPageCtrl.saveStock = saveStock;
    }
    angular
        .module('EasyBikeApp.Stock')
        .controller('StockPageController', StockPageController);
})();

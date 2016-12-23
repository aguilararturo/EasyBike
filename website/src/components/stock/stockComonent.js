(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function stockComonent() {
        return {
            restrict: 'E',
            templateUrl: 'components/stock/stockComonent.tpl.html',
            controller: 'StockComonentController',
            controllerAs: 'stockCompCtrl',
            bindToController: {
                products: '=',
                title: '@',
                stocks: '=',
                allowSearch: '@'
            },
            scope: true
        };
    }
    /**
     * @function StockComonentController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} _ Lodash lodash
     */
    function StockComonentController(_) {
        var stockCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            stockCompCtrl.searchText = '';
            stockCompCtrl.stock = {
                product: {},
                quantity: 0,
                dueDate: null
            };
            stockCompCtrl.displaySearchOptions = false;
            stockCompCtrl.datePicks = [];
        }

        function searchChange() {
            if (stockCompCtrl.searchText.length > 0) {
                stockCompCtrl.displaySearchOptions = true;
            }
        }

        function addProduct(product) {
            stockCompCtrl.stocks.push({
                product: product,
                quantity: 1,
                dueDate: new Date()
            });
            stockCompCtrl.searchText = '';
        }

        function openDatePick(index) {
            stockCompCtrl.datePicks[index] = true;
        }

        function removeStock(stock) {
            _.remove(stockCompCtrl.stocks, function removeItem(n) {
                return n === stock;
            });
        }

        stockCompCtrl.$onInit = $onInit;
        stockCompCtrl.searchChange = searchChange;
        stockCompCtrl.addProduct = addProduct;
        stockCompCtrl.openDatePick = openDatePick;
        stockCompCtrl.removeStock = removeStock;
    }
    angular
        .module('EasyBikeApp.User')
        .controller('StockComonentController', StockComonentController)
        .directive('stockComonent', stockComonent);
})();

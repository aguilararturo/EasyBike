(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function productPriceComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/product/productPrice/productPriceCmp.tpl.html',
            controller: 'ProductPriceComponentController',
            controllerAs: 'prodPriceCmpCtrl',
            bindToController: {
                products: '=',
                title: '@',
                items: '=',
                allowSearch: '@',
                saveAction: '&?',
                readOnly: '@'            
            },
            scope: true
        };
    }
    /**
     * @function StockComonentController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} _ Lodash lodash
     */
    function ProductPriceComponentController(_, $scope) {
        var prodPriceCmpCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            prodPriceCmpCtrl.searchText = {};
            prodPriceCmpCtrl.displaySearchOptions = false;            

            prodPriceCmpCtrl.displaySave = !_.isUndefined(prodPriceCmpCtrl.saveAction);
            $scope.$watch(getProduct, loadProducts);
        }

        function getProduct() {
            return prodPriceCmpCtrl.products;
        }

        function loadProducts(product) {
            _.forEach(prodPriceCmpCtrl.products, addProduct);
        }

        function addProduct(product) {
            prodPriceCmpCtrl.items.push({
                product: product,
                price: 0
            });
            prodPriceCmpCtrl.searchText = '';
        }
    
        function removeStock(stock) {
            _.remove(prodPriceCmpCtrl.items, function removeItem(n) {
                return n === stock;
            });
        }

        prodPriceCmpCtrl.$onInit = $onInit;        
        prodPriceCmpCtrl.addProduct = addProduct;        
        prodPriceCmpCtrl.removeStock = removeStock;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductPriceComponentController', ProductPriceComponentController)
        .directive('productPriceComponent', productPriceComponent);
})();

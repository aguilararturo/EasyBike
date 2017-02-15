(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function searchCmp() {
        return {
            restrict: 'E',
            templateUrl: 'components/search/searchCmp.tpl.html',
            controller: 'SearchComponetController',
            controllerAs: 'searchCmpCtrl',
            bindToController: {
                searchText: '=',
                items: '=',
                helpText: '=',
                onSearchChange: '&?',
                getItemText: '&?',
                onSelectedItem: '&?'
            },
            scope: true
        };
    }

    function SearchComponetController(_, ProductCategoryService, $state, $element) {
        var searchCmpCtrl = this;
        /**
        * @function $onInit
        * @memberOf SearchComponetController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            searchCmpCtrl.displaySearchBox = !_.isEmpty(searchCmpCtrl.searchText);
            searchCmpCtrl.inputContainer = angular.element($element[0].querySelectorAll('#searchTextId'));
        }

        function searchChange() {
            if (!_.isNil(searchCmpCtrl.onSearchChange)) {
                searchCmpCtrl.onSearchChange();
            }

            searchCmpCtrl.displaySearchBox = !_.isEmpty(searchCmpCtrl.searchText);
        }

        function getText(item) {
            if (!_.isNil(searchCmpCtrl.getItemText)) {
                var text = searchCmpCtrl.getItemText(item);
                return text;
            }

            return item.direction;
        }

        function onSelected(item) {
            if (!_.isNil(searchCmpCtrl.onSelectedItem)) {
                searchCmpCtrl.onSelectedItem()(item);
            }
        }

        searchCmpCtrl.$onInit = $onInit;
        searchCmpCtrl.searchChange = searchChange;
        searchCmpCtrl.getText = getText;
        searchCmpCtrl.onSelected = onSelected;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('SearchComponetController', SearchComponetController)
        .directive('searchCmp', searchCmp);
})();

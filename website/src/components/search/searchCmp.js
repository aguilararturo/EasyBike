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
                onSelectedItem: '&?',
                cleanOnSelect: '=',
                onEnterAction: '&?'
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

            searchCmpCtrl.selectedItem = {};
            searchCmpCtrl.inputText = '';
        }

        function searchChange() {
            if (!_.isNil(searchCmpCtrl.onSearchChange)) {
                searchCmpCtrl.onSearchChange();
            }

            searchCmpCtrl.displaySearchBox = !_.isEmpty(searchCmpCtrl.searchText);
            searchCmpCtrl.inputText = _.clone(searchCmpCtrl.searchText);
        }

        function getText(item) {
            if (!_.isNil(searchCmpCtrl.getItemText)) {
                var text = searchCmpCtrl.getItemText()(item);
                return text;
            }
        }

        function onSelected(item, model, label, event) {
            console.log('selected search', item, model, label, event);
            var oldText = searchCmpCtrl.searchText;
            if (!_.isNil(item)) {
                if (searchCmpCtrl.cleanOnSelect) {
                    searchCmpCtrl.searchText = '';
                } else {
                    searchCmpCtrl.searchText = getText(item);
                }
            }
            if (!_.isNil(searchCmpCtrl.onSelectedItem)) {
                searchCmpCtrl.onSelectedItem()(item, searchCmpCtrl.inputText);
            }
        }

        function onKeyEnter() {
            if (!_.isUndefined(searchCmpCtrl.onEnterAction)) {
                searchCmpCtrl.onEnterAction()(searchCmpCtrl.inputText);
            }
        }


        searchCmpCtrl.$onInit = $onInit;
        searchCmpCtrl.searchChange = searchChange;
        searchCmpCtrl.getText = getText;
        searchCmpCtrl.onSelected = onSelected;
        searchCmpCtrl.onKeyEnter = onKeyEnter;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('SearchComponetController', SearchComponetController)
        .directive('searchCmp', searchCmp);
})();

(function() {
    'use strict';

    function UtilityService(_) {
        function unSelected(items) {
            function iterateItems(item) {
                item.selected = false;
            }
            return _.map(items, iterateItems);
        }

        function getSelected(items) {
            function findSelected(item) {
                return item.selected;
            }

            return _.find(items, findSelected);
        }

        return {
            unSelected: unSelected,
            getSelected: getSelected
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('UtilityService', UtilityService);
})();

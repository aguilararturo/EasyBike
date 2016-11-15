(function() {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function listButtons() {
        return {
            restrict: 'E',
            templateUrl: 'components/buttons/listButtons.tpl.html',
            controller: 'ListButtonsController',
            controllerAs: 'lbCtrl',
            bindToController: {
                name: '@',
                add: '&?',
                edit: '&?',
                remove: '&?'
            },
            scope: true
        };
    }
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} _ Lodash lodash
     */
    function ListButtonsController(_) {
        var lbCtrl = this;

        /**
        * @function $onInit
        * @memberOf ListButtonsController
        * @desc Initializes controller
        */
        function $onInit() {
            console.log(_.isUndefined(lbCtrl.add), _.isUndefined(lbCtrl.edit), _.isUndefined(lbCtrl.remove));

            lbCtrl.displayAdd = !_.isUndefined(lbCtrl.add);
            lbCtrl.displayRemove = !_.isUndefined(lbCtrl.remove);
            lbCtrl.displayEdit = !_.isUndefined(lbCtrl.edit);

            console.log('listButtons', lbCtrl.name);
        }

        function removeItem() {
            lbCtrl.remove()();
        }

        function addItem() {
            lbCtrl.add()();
        }

        function editItem() {
            lbCtrl.edit()();
        }

        lbCtrl.$onInit = $onInit;
        lbCtrl.addItem = addItem;
        lbCtrl.editItem = editItem;
        lbCtrl.removeItem = removeItem;
    }
    angular
        .module('EasyBikeApp.components')
        .controller('ListButtonsController', ListButtonsController)
        .directive('listButtons', listButtons);
})();

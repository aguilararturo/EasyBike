(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function bikeTableComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/bike/bikeTable/bikeTableComponent.tpl.html',
            controller: 'BikeTableComponetController',
            controllerAs: 'bikeTblCompCtrl',
            bindToController: {
                bikes: '=',
                saveAction: '&',
                enabledOption: '@',
                disableOption: '@',
                actionPerforme: '&?',
                enableSelection: '@',
                selectionChange: '&?'
            },
            scope: true
        };
    }
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} $element directive element
     * @param  {Object} $scope directive scope
     * @param  {Object} CatalogService catalog service
     * @param  {Object} SearchService search service
     * @param  {Object} BrandingModel Branding Model service
     * @param  {const} UTILS_CONSTANT used to go search state based on selected brand
     * @param  {const} DISPLAY_SIZES display size
     * @param  {Object} URLUtils util to validate the image url
     * @param  {Object} UtilityService Utility Service
     * @param  {Object} _ Lodash lodash
     */
    function BikeTableComponetController(_, ModalUtility, BikeEnabledService) {
        var bikeTblCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            bikeTblCompCtrl.text = 'Datos Motociclista';
            _.map(bikeTblCompCtrl.bikes, setFalseSelection);
        }

        function enableBike(bike) {
            var okeyKey = 'Habilitar Moto';
            var modResult = ModalUtility.openAskEnableBikeModal(bike.code, okeyKey);
            modResult.result.then(closemod);

            function closemod(option) {
                if (option === okeyKey) {
                    var regBike = {
                        id: 0,
                        bike: bike,
                        date: '',
                        user: {
                            id: 0,
                            nick: '',
                            password: '',
                            name: ''
                        }
                    };
                    BikeEnabledService.saveBikeRegister(regBike).then(
                        function completeSave() {
                            ModalUtility.openSaveCompleteModal();
                            launchActionPerforme();
                        }
                    );
                }
            }
        }

        function disableBike(bike) {
            var okeyKey = 'Deshabilitar Moto';
            var modResult = ModalUtility.openAskEnableBikeModal(bike.code, okeyKey);
            modResult.result.then(closemod);

            function closemod(option) {
                if (option === okeyKey) {
                    BikeEnabledService.disableBikeRegister(bike).then(
                        function completeSave() {
                            ModalUtility.openSaveCompleteModal();
                            launchActionPerforme();
                        }
                    );
                }
            }
        }

        function launchActionPerforme() {
            if (!_.isUndefined(bikeTblCompCtrl.actionPerforme)) {
                bikeTblCompCtrl.actionPerforme();
            }
        }

        function setFalseSelection(element) {
            element.selected = false;
        }

        function selection(bike) {
            _.forEach(bikeTblCompCtrl.bikes, setFalseSelection);
            bike.selected = true;

            if (!_.isUndefined(bikeTblCompCtrl.selectionChange)) {
                bikeTblCompCtrl.selectionChange();
            }
        }

        bikeTblCompCtrl.$onInit = $onInit;
        bikeTblCompCtrl.enableBike = enableBike;
        bikeTblCompCtrl.disableBike = disableBike;
        bikeTblCompCtrl.selection = selection;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('BikeTableComponetController', BikeTableComponetController)
        .directive('bikeTableComponent', bikeTableComponent);
})();

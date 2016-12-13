(function () {
    'use strict';

    /**
     * @function stepComponent
     * @author Arturo Aguilar
     * @desc Builds the object definition for the directive.
     * @return {Object} with directive properties.
     */
    function stepComponent() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'StepComponentController',
            controllerAs: 'stepsCmpCtrl',
            templateUrl: 'components/step/stepComponent.tpl.html',
            bindToController: {
                steps: '=',
                selectedStep: '='
            }
        };
    }

    /**
     * @class StepComponentController
     * @author Arturo Aguilar
     * @desc Handles Wizard Steps interaction between the model and the view.
     * @param {Object} _ - Lodash Library.
     */
    function StepComponentController(_) {
        var stepsCmpCtrl = this;
        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            function findSelected(step) {
                return step.selected;
            }
            var selectedStep = _.find(stepsCmpCtrl.steps, findSelected);
            if (!_.isUndefined(selectedStep)) {
                selectStep(selectedStep);
            }
        }
        function clickStep(step, index) {
            step.selected = true;
            stepsCmpCtrl.selectedStep = step;
            if (index - 1 >= 0) {
                stepsCmpCtrl.prevStep = stepsCmpCtrl.steps[index - 1];
            } else {
                stepsCmpCtrl.prevStep = null;
            }

            if (index + 1 < stepsCmpCtrl.steps.length) {
                stepsCmpCtrl.nextStep = stepsCmpCtrl.steps[index + 1];
            } else {
                stepsCmpCtrl.nextStep = null;
            }
            var i = 0;

            _.forEach(stepsCmpCtrl.steps, iterateSteps);

            function iterateSteps(stepItem) {
                if (i <= index) {
                    stepItem.selected = true;
                } else {
                    stepItem.selected = false;
                }
                i++;
            }
        }

        function selectStep(step) {
            stepsCmpCtrl.clickStep(step, _.indexOf(stepsCmpCtrl.steps, step));
        }

        stepsCmpCtrl.$onInit = $onInit;
        stepsCmpCtrl.clickStep = clickStep;
        stepsCmpCtrl.selectStep = selectStep;
    }

    angular
        .module('EasyBikeApp.Components')
        .controller('StepComponentController', StepComponentController)
        .directive('stepComponent', stepComponent);
})();

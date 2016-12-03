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
        function clickStep(step, index) {
            step.selected = true;
            stepsCmpCtrl.selectedStep = step;
            var i = 0;

            _.forEach(stepsCmpCtrl.steps, iterateSteps);

            function iterateSteps(step) {                
                if (i <= index) {
                    step.selected = true;
                } else {
                    step.selected = false;
                }
                i++;
            }
        }

        stepsCmpCtrl.clickStep = clickStep;
    }

    angular
        .module('EasyBikeApp.Components')
        .controller('StepComponentController', StepComponentController)
        .directive('stepComponent', stepComponent);
})();

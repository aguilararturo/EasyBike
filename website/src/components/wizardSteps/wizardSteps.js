(function () {
    'use strict';

    /**
     * @function cmpWizardSteps
     * @author Reynaldo Rivera
     * @desc Builds the object definition for the directive.
     * @return {Object} with directive properties.
     */
    function cmpWizardSteps() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'WizardStepsCtrl',
            controllerAs: 'wizardStepsCtrl',
            templateUrl: 'components/wizardSteps/wizardSteps.tpl.html',
            bindToController: {
                steps: '=',
                selectedStep: '='
            }
        };
    }

    /**
     * @class WizardStepsCtrl
     * @author Reynaldo Rivera
     * @desc Handles Wizard Steps interaction between the model and the view.
     * @param {Object} _ - Lodash Library.
     */
    function WizardStepsCtrl(_) {
        var wizardStepsCtrl = this;

        /**
         * Verifies if the stepToCompare matches the selected step.
         * @param  {String}  stepToCompare with the selected step.
         * @return {Boolean} True if stepToCompare matches with the selected step. Otherwise false.
         */
        function isSelectedStep(stepToCompare) {
            return _.isEqual(wizardStepsCtrl.selectedStep, stepToCompare);
        }

        wizardStepsCtrl.isSelectedStep = isSelectedStep;
    }

    angular
        .module('EasyBikeApp.Components')
        .controller('WizardStepsCtrl', WizardStepsCtrl)
        .directive('wizardStepsComponent', cmpWizardSteps);
})();

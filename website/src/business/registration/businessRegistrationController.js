(function () {
    'use strict';
    function BusinessRegistrationController(CommonService, BussinessService, ModalUtility, ProductCategoryService, $state, _, $q) {
        var busRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller for Product
         * @author Arturo Aguilar
         */
        function $onInit() {
            busRegCtrl.submited = false;
            busRegCtrl.displaySave = true;
            busRegCtrl.displayNewCat = false;
            busRegCtrl.errorAddress = false;
            busRegCtrl.errorPhone = false;
            initializeNewCategory();
            busRegCtrl.customCategories = [];
            busRegCtrl.bussines = {
                id: 0,
                codSubfix: '',
                name: '',
                addresses: [{
                    id: 0,
                    location: '',
                    date: '',
                    direction: '',
                    number: 0
                }],
                phones: [
                    {
                        id: 0,
                        number: ''
                    }
                ],
                imageUrl: '',
                categories: []
            };

            busRegCtrl.textTitle = 'Datos Empresa';

            ProductCategoryService.getDefaultProductCategory().then(loadCategories);
        }
        function loadCategories(response) {
            busRegCtrl.customCategories = response;
        }
        function initializeNewCategory() {
            busRegCtrl.newCategory = {
                id: 0,
                name: '',
                ImageUrl: '',
                default: false,
                selected: true
            };
        }

        function validateData() {
            function phoneIterator(phone) {
                return _.isNumber(phone.number);
            }
            function iterateAddress(address) {
                return !_.isEmpty(address.direction) && !_.isEmpty(address.location);
            }

            busRegCtrl.errorPhone = !_.every(busRegCtrl.bussines.phones, phoneIterator);

            busRegCtrl.errorAddress = !_.every(busRegCtrl.bussines.addresses, iterateAddress);

            return !busRegCtrl.errorAddress && !busRegCtrl.errorPhone;
        }

        function saveAction(invalid) {
            busRegCtrl.submited = true;

            function saveSussess() {
                $state.reload();
            }

            busRegCtrl.submited = true;
            var deferrer = $q.defer();
            var validateFlag = validateData();
            if (invalid || !validateFlag) {
                busRegCtrl.displayError = true;
                deferrer.reject();
            } else {
                deferrer.resolve(BussinessService.saveBusiness(busRegCtrl.bussines)
                    .then(saveSussess));
            }
            return deferrer.promise;
        }

        function addNewCategory() {
            busRegCtrl.displayNewCat = true;
        }

        function addCategory() {
            busRegCtrl.customCategories.push(_.clone(busRegCtrl.newCategory));
            busRegCtrl.bussines.categories.push(_.clone(busRegCtrl.newCategory));
            initializeNewCategory();
            busRegCtrl.displayNewCat = false;
        }

        busRegCtrl.$onInit = $onInit;
        busRegCtrl.saveAction = saveAction;
        busRegCtrl.addNewCategory = addNewCategory;
        busRegCtrl.addCategory = addCategory;
    }
    angular
        .module('EasyBikeApp.Business')
        .controller('BusinessRegistrationController', BusinessRegistrationController);
})();

(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function imageComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/image/imageComponent.tpl.html',
            controller: 'ImageComponentController',
            controllerAs: 'imgCompCtrl',
            bindToController: {
                imageUrl: '='
            },
            scope: true
        };
    }
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} _ Lodash lodash
     */
    function ImageComponentController(_, $element, $scope) {
        var imgCompCtrl = this;


        /**
        * @function $onInit
        * @memberOf ListButtonsController
        * @desc Initializes controller
        */
        function $onInit() {
            $element.ready(linkInput);

            console.log('imgCompCtrl', imgCompCtrl.name);
            imgCompCtrl.displayImage = true;
            imgCompCtrl.displayImageEdition = false;
        }

        function linkInput() {

            var inputElm = angular.element($element[0].querySelector('#imgCompInp'));
            inputElm.bind("change", readFile);
        }

        function readFile(input) {
            function onloadImage(e) {
                imgCompCtrl.displayImageEdition = true;
                imgCompCtrl.displayImage = false;
                $scope.$apply(function () {
                    $element.ready(function () {
                        imgCompCtrl.cropierElem = angular.element($element[0].querySelector('#croppier-container'));
                        imgCompCtrl.cropierElem.croppie({
                            viewport: {
                                width: 100,
                                height: 100,
                                type: 'square'
                            },
                            boundary: {
                                width: 120,
                                height: 120
                            },
                            enforceBoundary: false,
                            enableExif: true,
                            enableOrientation: true
                        });
                        imgCompCtrl.cropierElem.croppie('bind', {
                            url: e.target.result
                        }).then(function () {
                            console.log('jQuery bind complete');
                        });
                    });
                });
            }

            if (input.target.files && input.target.files[0]) {
                var reader = new FileReader();

                reader.onload = onloadImage;

                reader.readAsDataURL(input.target.files[0]);
            }
            else {
                console.log("Sorry - you're browser doesn't support the FileReader API");
            }
        }

        function cutImage() {
            imgCompCtrl.cropierElem.croppie('result', {
                type: 'rawcanvas',
                format: 'png'
            }).then(function (canvas) {
                var ddd = canvas.toDataURL();
                imgCompCtrl.imageUrl = canvas.toDataURL();
                imgCompCtrl.displayImage = true;
            });


            console.log('cutImage');
        }

        imgCompCtrl.$onInit = $onInit;
        imgCompCtrl.readFile = readFile;
        imgCompCtrl.cutImage = cutImage;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('ImageComponentController', ImageComponentController)
        .directive('imageComponent', imageComponent);
})();

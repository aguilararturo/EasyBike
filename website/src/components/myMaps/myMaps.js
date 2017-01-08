(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function myMaps() {
        return {
            restrict: 'E',
            templateUrl: 'components/myMaps/myMaps.tpl.html',
            controller: 'MyMapsController',
            controllerAs: 'myMapsCtrl',
            bindToController: {
                location: '=',
                direction: '='
            },
            scope: true
        };
    }
    /**
     * @function myMapsController
     * @desc Controller to load maps directive
     * @param  {Object} _ Lodash lodash
     */
    function MyMapsController(_, NgMap, $scope) {
        var myMapsCtrl = this;

        /**
        * @function $onInit
        * @memberOf ListButtonsController
        * @desc Initializes controller
        */
        function $onInit() {
            NgMap.getMap().then(initMap);

        }

        function initMap(map) {
            myMapsCtrl.map = map;
            myMapsCtrl.position = _.clone(myMapsCtrl.location);
            myMapsCtrl.map.addListener('click', function (e) {
                placeMarkerAndPanTo(e.latLng, map);
            });
        }

        function placeMarkerAndPanTo(latLng, map) {
            var marker = {
                position: [latLng.lat(), latLng.lng()],
                map: map
            };


            console.log(latLng.lat(), latLng.lng());
            myMapsCtrl.map.markers[0].setPosition(latLng);
            myMapsCtrl.location = latLng.lat() + ',' + latLng.lng();
            //myMapsCtrl.position = [latLng.lat(), latLng.lng()];
            console.log('mymap',myMapsCtrl.location);
            $scope.$apply();
        }

        myMapsCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('MyMapsController', MyMapsController)
        .directive('myMaps', myMaps);
})();

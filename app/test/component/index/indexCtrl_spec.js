define([
    'angular',
    'angularRoute',
    'angularMocks',
    'components/index/indexCtrl'
], function (angular, indexCtrl) {
    describe('Index Controller', function () {
        beforeEach(module('ngRoute'));
        beforeEach(module('mainApp'));

        var $controller;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
        }));

        describe('$scope.test', function() {
            it('gets set to Hello', function() {
                var $scope = {};
                var controller = $controller('IndexCtrl', {$scope: $scope});

                expect($scope.test).toEqual('Hello');
            });
        });
    });
});

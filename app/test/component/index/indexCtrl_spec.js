define([
    'angular',
    'angularMocks',
], function (angular) {
    describe('Index Controller', function () {
        beforeEach(function(done) {
            mapRequireDependency('app', 'testMocks/appMock', 'components/index/indexCtrl', done);
            module('mainApp');
        });
        afterEach(function() {
            unmapRequireDependency('app', 'components/index/indexCtrl');
        });

        var $controller;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
        }));

        describe('$scope.test', function() {
            it('gets set to Hello', function() {
                var $scope = {};
                var controller = $controller('indexCtrl', {$scope: $scope});

                expect($scope.test).toEqual('Hello');
            });
        });
    });

});

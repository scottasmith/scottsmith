define('tests/component/index/indexCtrl_spec', [
    'components/index/indexCtrl',
    'angularMock',
    function (angular, indexCtrl) {
        describe('Index Controller', function () {
            var scope, ctrl;

            beforeEach(module('mainApp'));

            beforeEach(inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                ctrl  = $controller('IndexCtrl', {$scope: scope});
            }));

            it('should set test on scope', function () {
                expect(scope.test).to.equal('Hello');
            });
        });
    }
]);

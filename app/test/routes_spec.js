define([
    'angular',
    'angularMocks',
    'angularRoute',
], function (angular) {
    describe('Routes modules should create routes', function () {
        var $httpBackend;

        beforeEach(function(done) {
            mapRequireDependency('app', 'testMocks/appMock', '');
            mapRequireDependency('shared/navigation/routeResolver', 'testMocks/shared/navigation/routeResolverMock', 'routes', done);
            module('ngRoute');
            module('routeResolver');
            module('mainApp');
        });
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        }));
        afterEach(function() {
            unmapRequireDependency('app', 'testMocks/shared/navigation/routeResolverMock');
            unmapRequireDependency('shared/navigation/routeResolve', 'routes');
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should resolve to index', inject(function($route, $location, $rootScope) {
            $httpBackend.when('GET', '/components/index/indexTemplate').respond('template');
            $location.path('/');
            $httpBackend.flush();

            expect($route.current.templateUrl).toBe('/components/index/indexTemplate');
            expect($route.current.controller).toBe('components/index/indexCtrl');
        }));

        it('should resolve to testpage', inject(function($route, $location, $rootScope) {
            $httpBackend.when('GET', '/components/testpage/testpageTemplate').respond('template');
            $location.path('/testpage');
            $httpBackend.flush();

            expect($route.current.templateUrl).toBe('/components/testpage/testpageTemplate');
            expect($route.current.controller).toBe('components/testpage/testpageCtrl');
        }));

        it('should resolve to index with nonexistent route', inject(function($route, $location, $rootScope) {
            $httpBackend.when('GET', '/components/index/indexTemplate').respond('template');
            $location.path('/some_non/existent/route');
            $httpBackend.flush();

            expect($route.current.templateUrl).toBe('/components/index/indexTemplate');
            expect($route.current.controller).toBe('components/index/indexCtrl');
        }));
    });
});


define('routes', [
    'app',
    'shared/navigation/routeResolver',
    'components/index/indexCtrl'
], function (app) {
    'use strict';

    app.config([
        '$routeProvider',
        'routeResolverProvider',
        function (
            $routeProvider,
            routeResolverProvider
        ) {
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/', {
                    templateUrl: '/views/components/index/index.html',
                    controller: 'indexCtrl'
                })

                .when('/testpage', route.resolve('testpage', 'components/testpage'))

                .otherwise({ redirectTo: '/' });
        }
    ]);
});

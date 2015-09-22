define('routes', [
    'app',
    'shared/navigation/routeResolver',
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
                .when('/', route.resolve('index', 'components/index'))
                .when('/testpage', route.resolve('testpage', 'components/testpage'))
                .otherwise({ redirectTo: '/' });
        }
    ]);
});

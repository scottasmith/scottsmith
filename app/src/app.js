define('app', [
    'angular',
    'shared/navigation/routeResolver'
], function () {
    'use strict';

    var app = angular.module('mainApp', [
        'ngRoute',
        'routeResolver'
    ]);

    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function (
            $controllerProvider,
            $compileProvider,
            $filterProvider,
            $provide
        ) {
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
        }
    ]);

    return app;
});

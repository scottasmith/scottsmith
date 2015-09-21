define('shared/navigation/routeResolver', ['appConfig'], function (appConfig) {
    'use strict';

    var routeResolver = function () {
        this.routeConfig = function () {
            var viewsDirectory = appConfig.directories.view,
                controllersDirectory = appConfig.directories.lazyLoad,

            getViewsDirectory = function () {
                return viewsDirectory;
            },
            getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function (routeConfig) {
            var resolve = function (baseName, path, secure) {
                if (!path) path = '';

                var params   = getParams(baseName, path);
                var routeDef = {
                    templateUrl: params.templatePath,
                    controller: params.controllerName,
                    secure: secure ? secure : false,
                    resolve: {
                        load: ['$q', '$rootScope', function ($q, $rootScope) {
                            var dependencies = [params.controllerPath];
                            return resolveDependencies($q, $rootScope, dependencies);
                        }]
                    }
                };
                return routeDef;
            },
            getParams = function (baseName, path) {
                var controllerName = baseName + 'Ctrl';
                var templatePath   = path;
                var controllerPath = path + '/' + controllerName;

                if ('' !== templatePath) {
                    templatePath = '/' + templatePath + '/';
                }

                return {
                    controllerName: controllerName,
                    controllerPath: controllerPath,
                    templatePath: routeConfig.getViewsDirectory() + templatePath + baseName + '.html'
                };
            },
            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            };
        }(this.routeConfig);

        this.$get = function () {
            return this;
        };
    };

    var app = angular.module('routeResolver', []);
    app.provider('routeResolver', routeResolver);
});

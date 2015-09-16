define('shared/navigation/routeResolver', [], function () {
    'use strict';

    var routeResolver = function () {
        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '/views/',
                controllersDirectory = '/app',

            setBaseDirectories = function (viewsDir, controllersDir) {
                viewsDirectory = viewsDir;
                controllersDirectory = controllersDir;
            },

            getViewsDirectory = function () {
                return viewsDirectory;
            },

            getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function (routeConfig) {
            var resolve = function (baseName, path, secure) {
                if (!path) path = '';

                var params = getParams(baseName, path);
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

                if ('' !== path) {
                    path = '/' + path + '/';
                }

                return {
                    controllerName: controllerName,
                    controllerPath: routeConfig.getControllersDirectory() + path + controllerName + '.js',
                    templatePath: routeConfig.getViewsDirectory() + path + baseName + '.html'
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
    };

    var app = angular.module('routeResolver', []);
    app.provider('routeResolver', routeResolver);
});

define('testMocks/shared/navigation/routeResolverMock', ['angular'], function() {
    var routeResolver = function() {
        this.route = function() {
            var resolve = function (baseName, path, secure) {
                return {
                    templateUrl: '/' + path + '/' + baseName + 'Template',
                    controller: path + '/' + baseName + 'Ctrl',
                    secure: secure ? secure : false,
                };
            }

            return {
                resolve: resolve
            };
        }();

        this.$get = function () {
            return this;
        };
    };

    var app = angular.module('routeResolver', []);
    app.provider('routeResolver', routeResolver);
});

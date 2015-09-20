define('components/index/indexCtrl', ['app'], function (app) {
    app.controller('IndexCtrl', [
        '$scope',
        function IndexCtrl($scope) {
            $scope.test = 'Hello';
        }
    ]);
});

define('components/index/indexCtrl', ['app'], function(app) {
    app.controller('indexCtrl', [
        '$scope',
        function($scope) {
            $scope.test = 'Hello';
        }
    ]);
});

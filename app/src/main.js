require.config({
    baseUrl: '/app',
    urlArgs: 'v=1.0'
});

require([
    'app',
    'routes',
    'components/main/appCtrl'
], function () {
    'use strict';

    angular.bootstrap(document, ['mainApp']);
});


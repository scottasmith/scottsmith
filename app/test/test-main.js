var allTestFiles = [];
var TEST_REGEXP = /(_spec|_test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(file);
    }
});

require.config({
    baseUrl: '/base/src',

    deps: allTestFiles,

    callback: window.__karma__.start,

    paths: {
        angular: '../vendor/angular/angular',
        angularRoute: '../vendor/angular-route/angular-route',
        angularMocks: '../vendor/angular-mocks/angular-mocks'
    },

    shim: {
        angular: { exports: 'angular' },
        angularRoute: { deps: ['angular'] },
        angularMocks: { deps: ['angular'] },
    }
});

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
        angularMocks: '../vendor/angular-mocks/angular-mocks',
        testMocks: '../test'
    },

    shim: {
        angular: { exports: 'angular' },
        angularRoute: { deps: ['angular'] },
        angularMocks: { deps: ['angular'] },
        testMocks: { exports: 'testMocks' }
    }
});

var mockMaps = {};

window.mapRequireDependency = function(moduleName, fakeModuleName, dependencyFor, done) {
    mockMaps[moduleName] = fakeModuleName;
    require.undef(dependencyFor);
    require.config({
        map: {
            '*': mockMaps
        }
    });
    require.undef(moduleName);

    if ('' !== dependencyFor) {
        require([dependencyFor], function() {
            if (done) {
                done();
            }
        });
    } else {
        if (done) {
            done();
        }
    }
};

window.unmapRequireDependency = function(moduleName, dependencyFor) {
    delete mockMaps[moduleName];
    require.undef(dependencyFor);
    require.config({
        map: {
            '*': mockMaps
        }
    });
    require.undef(moduleName);
};

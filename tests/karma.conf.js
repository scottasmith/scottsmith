// Karma configuration
// Generated on Thu Sep 17 2015 13:08:37 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    basePath: '../',

    frameworks: ['jasmine', 'requirejs'],

    files: [
      'tests/test-main.js',
      'app/**/*.js',
      'tests/**/*.js'
    ],

    exclude: [
      '**/*.swp',
      'app/**/*.html'
    ],

    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false
  });
};

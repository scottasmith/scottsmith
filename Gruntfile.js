module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            app: 'app',
            less: 'less',
            fonts: 'fonts',
            build: 'build',
            vendor: 'app/vendor',
            public_assets: 'public/assets',
            public_app: 'public/app',
            public_views: 'public/views',
            public_fonts: 'public/assets/fonts',
            public: 'public'
        },

        jshint: {
            beforeconcat: [
                '<%= dirs.app %>/**/*.js'
            ]
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            libJs: {
                src: [
                    '<%= dirs.vendor %>/requirejs/require.js',
                    '<%= dirs.vendor %>/jquery/dist/jquery.js',
                    '<%= dirs.vendor %>/bootstrap/dist/js/bootstrap.js',
                    '<%= dirs.vendor %>/angular/angular.js',
                    '<%= dirs.vendor %>/angular-aria/angular-aria.js',
                    '<%= dirs.vendor %>/angular-animate/angular-animate.js',
                    '<%= dirs.vendor %>/angular-route/angular-route.js'
                ],
                dest: '<%= dirs.build %>/lib.js'
            },
            appJs: {
                src: [
                    '<%= dirs.app %>/main.js',
                    '<%= dirs.app %>/*.js',
                    '<%= dirs.app %>/shared/**/*.js',
                    '<%= dirs.app %>/components/main/*.js',
                    '<%= dirs.app %>/components/index/*.js'
                ],
                dest: '<%= dirs.build %>/main.js',
            },
            less: {
                src: [
                    '<%= dirs.vendor %>/simple-line-icons-webfont/simple-line-icons.css',
                    '<%= dirs.less %>/vendor.less',
                    '<%= dirs.less %>/mixins.less',
                    '<%= dirs.less %>/main.less',
                    '<%= dirs.less %>/*.less'
                ],
                dest: '<%= dirs.build %>/app.less'
            }
        },

        less: {
            build: {
                options: {
                    compress: true
                },
                files: {
                    '<%= dirs.build %>/app.css': '<%= dirs.build %>/app.less'
                }
            }
        },

        uglify: {
            appJs: {
                src: '<%= dirs.build %>/main.js',
                dest: '<%= dirs.build %>/main.min.js'
            },
            dynAppJs: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.app %>',
                    src: [
                        'components/**/*.js',
                        '!components/main/*.js',
                        '!components/index/*.js'
                    ],
                    dest: '<%= dirs.build %>/',
                    ext: '.js'
                }]
            },
            libJs: {
                options: {
                    preserveComments: 'some'
                },
                src: '<%= dirs.build %>/lib.js',
                dest: '<%= dirs.build %>/lib.min.js'
            }
        },

        copy: {
            libJs: {
                expand: true,
                cwd: '<%= dirs.build %>',
                src: [
                    'lib.js',
                    'lib.min.js'
                ],
                dest: '<%= dirs.public_assets %>/',
                flatten: true
            },
            appJs: {
                expand: true,
                src: '<%= dirs.build %>/main.js',
                dest: '<%= dirs.public_app %>/',
                flatten: true
            },
            dynAppJs: {
                expand: true,
                cwd: '<%= dirs.build %>',
                src: [
                    'components/**/*.js'
                ],
                dest: '<%= dirs.public_app %>'
            },
            dynAppViews: {
                expand: true,
                cwd: '<%= dirs.app %>',
                src: [
                    'components/**/*.html'
                ],
                dest: '<%= dirs.public_views %>'
            },
            css: {
                expand: true,
                src: '<%= dirs.build %>/*.css',
                dest: '<%= dirs.public_assets %>/',
                flatten: true
            },
            fonts: {
                expand: true,
                src: [
                    '<%= dirs.vendor %>/bootstrap/fonts/*',
                    '<%= dirs.vendor %>/fontawesome/fonts/*',
                    '<%= dirs.vendor %>/simple-line-icons-webfont/fonts/*',
                    '<%= dirs.fonts %>/*'
                ],
                dest: '<%= dirs.public_fonts %>/',
                flatten: true
            }
        },

        watch: {
            appJs: {
                files: [
                    '<%= dirs.app %>/*.js',
                    '<%= dirs.app %>/shared/**/*.js',
                    '<%= dirs.app %>/components/main/*.js',
                    '<%= dirs.app %>/components/index/*.js'
                ],
                tasks: ['jshint', 'concat:appJs', 'uglify:appJs', 'copy:appJs'],
                options: {
                    spawn: false
                }
            },
            dynAppJs: {
                files: [
                    '<%= dirs.app %>/components/**/*.js',
                    '!<%= dirs.app %>/components/main/*.js',
                    '!<%= dirs.app %>/components/index/*.js'
                ],
                tasks: ['jshint', 'uglify:dynAppJs', 'copy:dynAppJs'],
                options: {
                    spawn: false
                }
            },
            dynAppViews: {
                files: [
                    '<%= dirs.app %>/components/**/*.html'
                ],
                tasks: ['copy:dynAppViews'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: [
                    '<%= dirs.less %>/vendors.less',
                    '<%= dirs.less %>/*.less'
                ],
                tasks: ['concat:less','less:build', 'copy:css'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['css','libJs','appJs','dynAppJs','fonts']);

    grunt.registerTask('css', ['concat:less', 'less:build', 'copy:css'])

    grunt.registerTask('libJs', ['concat:libJs', 'uglify:libJs', 'copy:libJs'])
    grunt.registerTask('appJs', ['jshint', 'concat:appJs', 'uglify:appJs', 'copy:appJs'])
    grunt.registerTask('dynAppJs', ['jshint', 'uglify:dynAppJs', 'copy:dynAppJs'])

    grunt.registerTask('dynAppViews', ['copy:dynAppViews'])

    grunt.registerTask('fonts', ['copy:fonts'])
};

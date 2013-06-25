// Generated on 2013-05-27 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            livereload: {
                files: [
                    '.tmp/README.html',
                    '*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            },
            markdown: {
                files: ['./README.md'],
                tasks: ['markdown', 'copy:markdown']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            markdown: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                        ];
                    }
                }
            },
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            markdown: {
                path: 'http://localhost:<%= connect.options.port %>/README.html'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        markdown: {
            all: {
                files: ['README.md'],
                dest: '.tmp',
                options: {
                    gfm: true,
                    highlight: 'manual',
                    codeLines: {
                        before: '<span>',
                        after: '</span>'
                    }
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess'
                    ]
                }]
            },
            markdown: {
                files: [{
                    expand: true,
                    cwd: 'docs/src/',
                    dest: '.',
                    src: ['README.md']
                }]
            }
        },
    });

    grunt.renameTask('regarde', 'watch');
    
    grunt.registerTask('default', [
        'mk',
    ]);
    
    grunt.registerTask('mk', [
        'markdown',
        'livereload-start',
        'connect:markdown',
        'open:markdown',
        'watch'
    ]);
};

module.exports = function (grunt) {

    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            jshint: {                   // Проверка ошибок
                files: [
                    'www/js/**/*.js'
                ],
                options: {
                    globals: {
                        jQuery: true
                    }
                }
            },
            sass: {                              // Task
                dist: {                            // Target
                    options: {                       // Target options
                        style: 'expanded'
                    },
                    files: {                         // Dictionary of files
                        'www/css/main.css': 'scss/main.scss'
                    }
                }
            },
            watch: {                //Сканирует изменения в файлах, если изменение есть, то автоматически запускает browserify
                scripts: {
                    files: ['www/js/**/*.js'],
                    tasks: ['jshint', 'clean:build', 'concat'],
                    options: {}
                },
                css: {
                    files: ['scss/**/*.scss'],
                    tasks: ['sass'],
                    options: {}
                }
            },
            bower_concat: {
                all: {
                    dest: 'www/_bower.js',  // Склеенный файл
                    exclude: [ "angular" // Пакеты, которые нужно исключить из сборки
                    ]
                }
            },
            concat: {
                options: {
                    // define a string to put between each file in the concatenated output
                    separator: ';'
                },
                dist: {
                    // the files to concatenate
                    src: ['www/js/**/*.js'],
                    // the location of the resulting JS file
                    dest: 'www/build.js'
                }
            },
            uglify: {
                js: {
                    src: ['www/build.js'],
                    dest: 'dist/js/build.min.js'
                },
                bower: {
                    src: ['www/_bower.js'],
                    dest: 'www/_bower.js'
                }
            },
            cssmin: {
                minify: {
                    src: 'www/css/main.css',
                    dest: 'www/css/main.min.css'
                }
            },
            clean: {
                dist: {
                    src: ['dist/']
                },
                build: {
                    src: ['client/build.js']
                },
                bower: {
                    src: ['client/_bower.js']
                }
            },
            copy: {
                dist: {
                    cwd: 'public',
                    src: ['lib/**/*.*', 'template/**/*.*', 'index.html'],
                    dest: 'dist',
                    expand: true
                }
            },
            filerev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 5
                },
                release: {
                    // filerev:release hashes(md5) all assets (images, js and css )
                    // in dist directory
                    files: [{
                        src: [
                            'dist/js/*.js',
                            'dist/css/*.css'
                        ]
                    }]
                }
            },
            usemin: {
                html: 'dist/index.html',
                options: {
                    assetsDirs: ['dist', 'dist/css', 'dist/js']
                }
            }
        }
    );


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('dev', [
        'devBuild',
        'watch'
    ]);
    grunt.registerTask('devBuild', [
        'jshint',
        'sass',
        'clean:build',
        'concat'
    ]);
    grunt.registerTask('devDependencies', [
        'clean:bower',
        'bower_concat',
        'uglify:bower'
    ]);
    grunt.registerTask('dist', [
        'devDependencies',
        'devBuild',
        'clean:dist',
        'copy',
        'uglify:js',
        'cssmin',
        'filerev',
        'usemin'
    ]);

};

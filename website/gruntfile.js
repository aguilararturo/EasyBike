module.exports = function(grunt) {
    // loading tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-karma');

    //var DEFAULT_BASE_URL_PATH = 'http://localhost:49177/api';
	var DEFAULT_BASE_URL_PATH = 'http://service.mototaxbolivia.com/api';
    var DEFAULT_USE_RECAPTCHA_VALUE = true;
    var buildConfig = require('./build_config.js');
    var teamcityProperties = grunt.file.readJSON(grunt.option('teamcity.properties.all') || 'local_config.json');
    var buildNumber = teamcityProperties['build.number'];
    var baseUrl = teamcityProperties.baseUrl || DEFAULT_BASE_URL_PATH;
    var useReCaptchaMock = teamcityProperties.replaceReCaptchaResponse;
    if (typeof useReCaptchaMock !== 'boolean') {
        useReCaptchaMock = DEFAULT_USE_RECAPTCHA_VALUE;
    }

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        buildNumber: teamcityProperties['build.number'],

        // clean
        clean: [
            '<%= docs_dir %>',
            '<%= build_dir %>',
            '<%= compile_dir %>'
        ],

        // copy
        copy: {
            scripts: {
                files: [
                    {
                        src: [ '<%= files.scripts %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },

            node_modules: {
                files: [
                    {
                        src: [ '<%= node_modules.scripts %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= node_modules.styles %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },

            assets: {
                files: [
                    {
                        src: ['src/favicon.ico'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ 'src/assets/*' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ 'bootstrap/*' ],
                        dest: '<%= build_dir %>/fonts/',
                        cwd: '<%= node_modules.bootstrap_assets %>/',
                        expand: true
                    },
                    {
                        src: [ '*' ],
                        dest: '<%= build_dir %>/fonts/',
                        cwd: '<%= node_modules.font_awesome_assets %>/',
                        expand: true
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        src: [ 'assets/Lato/*' ],
                        dest: '<%= build_dir %>/src/',
                        cwd: 'src/',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: ['src/favicon.ico'],
                        dest: '<%= compile_dir %>/',
                        cwd: '<%= build_dir %>/',
                        expand: true
                    },
                    {
                        src: ['assets/*'],
                        dest: '<%= compile_dir %>/src/',
                        cwd: '<%= build_dir %>/src/',
                        expand: true
                    },
                    {
                        src: [ 'assets/Lato/*' ],
                        dest: '<%= compile_dir %>/src/',
                        cwd: '<%= build_dir %>/src/',
                        expand: true
                    },
                    {
                        src: [ 'bootstrap/*' ],
                        dest: '<%= compile_dir %>/fonts/',
                        cwd: '<%= node_modules.bootstrap_assets %>/',
                        expand: true
                    },
                    {
                        src: [ '*' ],
                        dest: '<%= compile_dir %>/fonts/',
                        cwd: '<%= node_modules.font_awesome_assets %>/',
                        expand: true
                    }
                ]
            }
        },

        // concat
        concat: {
            compile_scripts: {
                src: [
                    'module.prefix',
                    '<%= build_dir %>/**/*.module.js',
                    '<%= build_dir %>/**/*.js',
                    '<%= html2js.app.dest %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.<%= buildNumber %>.js'
            },
            compile_vendor_scripts: {
                src: [
                    '<%= node_modules.scripts %>'
                ],
                dest: '<%= compile_dir %>/assets/vendor.<%= pkg.version %>.<%= buildNumber %>.js'
            },
            build_vendor_styles: {
                src: [
                    '<%= node_modules.styles %>'
                ],
                dest: '<%= compile_dir %>/assets/vendor.<%= pkg.version %>.<%= buildNumber %>.css'
            }
        },

        // ng-annotate
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            compile: {
                files: [
                    {
                        src: [ '<%= files.scripts %>' ],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            }
        },

        // uglify
        uglify: {
            compile: {
                files: {
                    '<%= concat.compile_scripts.dest %>': '<%= concat.compile_scripts.dest %>'
                }
            }
        },

        // sass
        sass: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.<%= buildNumber %>.css': 'src/index.scss'
                }
            },
            compile: {
                files: {
                    '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.<%= buildNumber %>.css': 'src/index.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },

        // js hint
        jshint: {
            src: [
                '<%= files.scripts %>'
            ],
            test: [
                '<%= files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                loopfunc: true,
                globals: {
                    'angular': false
                }
            }
        },

        // js documentation
        jsdoc: {
            dist: {
                src: [ '<%= files.jsDocScripts %>' ],
                dest: '<%= docs_dir %>',
                options: {
                    recurse: true
                }
            }
        },

        // converts tpl.html files into js for fast rendering
        html2js: {
            app: {
                options: {
                    base: 'src',
                    module: 'EasyBikeApp.Templates'
                },
                src: [ '<%= files.templates %>' ],
                dest: '<%= build_dir %>/EasyBikeApp.<%= buildNumber %>.js'
            }
        },

        // karma config
        karma: {
            options: {
                configFile: 'tests/karma.config.js'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        index: {

            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= node_modules.scripts %>',
                    '<%= files.scripts %>',
                    '<%= build_dir %>/src/**/*.module.js',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.<%= buildNumber %>.css',
                    '<%= node_modules.styles %>'
                ],
                lr: ['//<%= connect.options.hostname %>:<%= connect.options.livereload %>/livereload.js'],
                locale: [ '<%= grunt.option(\'locale\') || \'en\'%>' ]
            },

            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_vendor_scripts.dest %>',
                    '<%= concat.compile_scripts.dest %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.<%= buildNumber %>.css',
                    '<%= compile_dir %>/assets/vendor.<%= pkg.version %>.<%= buildNumber %>.css'
                ],
                lr: [ ],
                locale: [ '<%= grunt.option(\'locale\') || \'en\'%>' ]
            }
        },

        watch: {

            options: {
                livereload: '<%= connect.options.livereload %>'
            },

            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'jshint:gruntfile' ],
                options: {
                    livereload: false
                }
            },

            jssrc: {
                files: [
                    '<%= files.scripts %>'
                ],
                tasks: [ 'jshint:src', 'jsdoc', 'copy:scripts' ]
            },

            index: {
                files: [ 'src/index.html' ],
                tasks: [ 'index:build' ]
            },

            tpls: {
                files: [
                    '<%= files.templates %>'
                ],
                tasks: [ 'html2js' ]
            },

            /**
             * When a SASS file changes, we need to compile them.
             */
            sass: {
                files: [ 'src/**/*.scss' ],
                tasks: [ 'sass:build' ]
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [
                    '<%= files.jsunit %>'
                ],
                tasks: [ 'jshint:test', 'karma:unit:run' ],
                options: {
                    livereload: false
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: '<%= build_dir %>'
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= compile_dir %>'
                }
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(gruntConfig, buildConfig));

    grunt.registerTask('default', [ 'build', 'compile' ]);

    grunt.registerTask('build', [
        'clean', 'html2js', 'jshint', 'sass:build', 'copy:scripts', 'copy:node_modules',
        'copy:assets', 'copy:fonts', 'index:build', 'jsdoc'
    ]);

    grunt.registerTask('build-notest', [
        'clean', 'html2js', 'jshint', 'sass:build', 'copy:scripts', 'copy:node_modules',
        'copy:assets', 'copy:fonts', 'index:build', 'jsdoc'
    ]);

    grunt.registerTask('compile', [ 'build', 'sass:compile', 'ngAnnotate', 'copy:compile_assets',
        'concat:compile_vendor_scripts', 'concat:compile_scripts', 'concat:build_vendor_styles',
        'uglify', 'index:compile'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run([
                'compile',
                'connect:dist:keepalive'
            ]);
        }

        return grunt.task.run([
            'build',
            'connect:livereload',
            'watch'
        ]);
    });

    /**
     * @desc A utility function to get all app JavaScript sources.
     * @param {Object[]} files list that will filter JS files only.
     * @return {Object[]} JS files.
     */
    function filterForJS(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * @desc A utility function to get all app CSS sources.
     * @param {Object[]} files list that will filter CSS files only.
     * @return {Object[]} CSS files.
     */
    function filterForCSS(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }

    /**
     * @desc A utility function to remove duplicates from an array.
     * @param {Object[]} dupArray Array from which duplicates will be removed.
     * @return {Object[]} array without duplicates.
     */
    function removeDuplicates(dupArray) {
        return dupArray.filter(function(elem, pos, arr) {
            return arr.indexOf(elem) === pos;
        });
    }

    /**
     * @desc Utility function that adds a query parameter with its associated value to the file
     * name.
     * @param {String[]} files collection of files names.
     * @param {String} queryParamName to append to file name.
     * @param {String} queryParamValue to append to file name.
     * @return {String[]} array of files names with the query parameter and value.
     */
    function addQueryParameterToFileName(files, queryParamName, queryParamValue) {
        return files.map(function fileNameMapper(fileName) {
            var modifiedFileName = fileName;
            if (fileName.indexOf('?') >= 0) {
                modifiedFileName = modifiedFileName + '&';
            } else {
                modifiedFileName = modifiedFileName + '?';
            }
            return modifiedFileName + queryParamName + '=' + queryParamValue;
        });
    }

    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var fullVersion = grunt.config('pkg.version') + '.' + buildNumber;

        var jsFiles = filterForJS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        jsFiles = removeDuplicates(jsFiles);

        var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        if (this.data.dir === 'build') {
            cssFiles = addQueryParameterToFileName(cssFiles, 'version', fullVersion);
            jsFiles = addQueryParameterToFileName(jsFiles, 'version', fullVersion);
        }

        // liveReload file. Only used in build, not compile.
        var lrFile = this.data.lr;
        var localeValue = this.data.locale;

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        lr: lrFile,
                        locale: localeValue,
                        version: fullVersion,
                        baseUrl: baseUrl,
                        useReCaptchaMock: useReCaptchaMock
                    }
                });
            }
        });
    });
};

module.exports = function(grunt) {

  'use strict';

  // load all grunt tasks
  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build'],

    concat: {
        dist: {
            options: {
              separator: '\n\n',
            },
            files: [
                {
                    dest: 'build/js/vendor.js',
                    src: [
                        'bower_components/modernizr/modernizr.js',
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/jquery-ui/jquery-ui.min.js',
                        'bower_components/bootstrap/dist/js/bootstrap.min.js'
                    ]
                },
                {
                    dest: 'build/js/scripts.js',
                    src: [
                        'src/js/<%= pkg.name %>.js',
                        'src/js/other.js'
                        //'<%= appConfig.source %>/services/{,*/}*.js'
                    ]
                },
                {
                  dest: 'build/css/vendor.css',
                  src : [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
                  ]
                }
            ]
        }
    },
    /**
    * Copies items into the out folder
    */
    copy: {
        source: {
            cwd: 'bower_components/bootstrap/dist/',
            dest: ['build'].join('/'),
            expand: true,
            src: 'fonts/*'
        },
      },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
          files: [
              {dest: 'build/js/vendor.min.js', src: ['build/js/vendor.js']},
              {dest: 'build/js/scripts.min.js', src: ['build/js/scripts.js']}
          ]
      }
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "build/css/result.css": "src/css/source.less"
        }
      }
    },

    watch: {
      styles: {
        files: ['src/css/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }

  });

  // Load the plugins

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'concat']);


};


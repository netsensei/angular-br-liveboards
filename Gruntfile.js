module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {
      build: {
        src: 'src/nmbs-liveboards.js',
        dest: 'build/nmbs-liveboards.min.js'
      }
    },

    sass: {
      prod: {
        files: {
          './build/nmbs-liveboards.css': './src/nmbs-liveboards.scss'
        }
      }
    },

    cssmin: {
      minify: {
        src: 'build/nmbs-liveboards.css',
        dest: 'build/nmbs-liveboards.min.css'
      }
    },

    watch: {
      js: {
        files: ['./src/*.js'],
        tasks: ['buildJs']
      },
      css: {
        files: ['./src/*.scss'],
        tasks: ['buildSass']
      },
      tests: {
        files: ['./test/**/*.js'],
        tasks: ['karma']
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        background: false
      }
    },

    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      target: {
        options: {
          configFile: "test/protractor.conf"
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('buildJs', ['uglify:build']);
  grunt.registerTask('buildSass', ['sass:prod', 'cssmin:minify']);
  grunt.registerTask('build', ['buildJs', 'buildSass']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('e2e', ['protractor']);
};

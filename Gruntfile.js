module.exports = function(grunt) {

  grunt.initConfig({

    ngmin: {
      build: {
        expand: true,
        src: ['src/liveboards.js'],
        dest: 'build/generated'
      }
    },

    uglify: {
      build: {
        src: 'build/generated/src/liveboards.js',
        dest: 'build/liveboards.min.js',
        mangle: false,
        report: 'min'
      }
    },

    sass: {
      prod: {
        files: {
          './build/liveboards.css': './src/liveboards.scss'
        }
      }
    },

    cssmin: {
      minify: {
        src: 'build/liveboards.css',
        dest: 'build/liveboards.min.css'
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.registerTask('buildJs', ['ngmin:build', 'uglify:build']);
  grunt.registerTask('buildSass', ['sass:prod', 'cssmin:minify']);
  grunt.registerTask('build', ['buildJs', 'buildSass']);
  grunt.registerTask('test', ['karma']);
};

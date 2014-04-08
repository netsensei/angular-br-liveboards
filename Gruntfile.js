module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {
      build: {
        src: 'src/liveboards.js',
        dest: 'build/liveboards.min.js'
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

  grunt.registerTask('buildJs', ['uglify:build']);
  grunt.registerTask('buildSass', ['sass:prod', 'cssmin:minify']);
  grunt.registerTask('build', ['buildJs', 'buildSass']);
  grunt.registerTask('test', ['karma']);
};

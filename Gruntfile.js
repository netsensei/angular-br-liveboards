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
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('buildJs', ['uglify:build']);
  grunt.registerTask('buildSass', ['sass:prod', 'cssmin:minify']);
  grunt.registerTask('build', ['buildJs', 'buildSass']);
  grunt.registerTask('test', ['karma']);
};

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
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('buildJs', ['uglify:build']);
  grunt.registerTask('buildSass', ['sass:prod', 'cssmin:minify']);
  grunt.registerTask('build', ['buildJs', 'buildSass']);
};

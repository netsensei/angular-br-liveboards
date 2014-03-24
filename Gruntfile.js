module.exports = function(grunt) {

  grunt.initConfig({
    // Task configuration.
    uglify: {
      build: {
        src: 'src/angular-nmbsliveboards.js',
        dest: 'build/angular-nmbsliveboards.min.js'
      }
    },

    concat: {
      build: {
        files: {
          'build/angular-nmbsliveboards.js':  'src/angular-nmbsliveboards.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
};

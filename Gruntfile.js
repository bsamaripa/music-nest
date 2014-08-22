//  Not ready! Do not use!
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    yuidoc: {
      compile: {
      name: '<%= pkg.name %>',
      description: '<%= pkg.description %>',
      version: '<%= pkg.version %>',
      url: '<%= pkg.homepage %>',
        options: {
          paths: './',
          outdir: 'docs/'
        }
      }
    },
    mocha: {

    },
    uglify: {

    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['mocha']);

};

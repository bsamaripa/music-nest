//  Not ready! Do not use!
module.exports = function(grunt) {
	grunt.initConfig({
	  jshint: {
	    all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
	  },
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', ['jshint']);

};

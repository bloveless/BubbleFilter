module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			dist: {
				files: {
					'dist/js/jquery.bubbleFilter.min.js': ['src/js/jquery.bubbleFilter.js'],
				},
			},
		},
		sass: {
			options: {
				style: 'compressed',
			},
			dist: {
				files: {
					'dist/css/jquery.bubbleFilter.min.css': 'src/css/jquery.bubbleFilter.scss',
				}
			},
		},
		watch: {
			scripts: {
				files: ['src/js/*.js'],
				tasks: ['uglify'],
				debug: false,
			},
			css: {
				files: ['src/css/*.scss'],
				tasks: ['sass'],
				debug: false,
			},
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'sass']);

};

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		javascripts: ['frontend/javascripts/**/*.js'],
		server_js: ['backend/**/*.js'],
		stylesheets: ['frontend/styles/**/*.styl'],

		jshint: {
			client: ['gruntfile.js', '<%= javascripts %>', '!frontend/javascripts/libs/**/*.js'],
			server: ['<%= server_js %>'],
			options: {
				sub: true,
				smarttabs: true,
			}
		},

		jade: {
			compile: {
				options: {
					debug: true
				},
				files: {
					'public/index.html': 'frontend/templates/index.jade',
				}
			}
		},

		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': ['frontend/styles/'],
					'compress': true
				},
				files: {
					'public/styles/style.css': ['<%= stylesheets %>']
				}
			}
		},

		clean: {	
			public_js: {src: ['public/javascripts']}
		},

		copy: {
			libs: {files: [{expand: false, src: ['node_modules/requirejs/require.js'], dest: 'public/javascripts/libs/require.js'},
							{expand: false, src: ['node_modules/jquery/dist/jquery.js'], dest: 'public/javascripts/libs/jquery.js'},
							{expand: false, src: ['node_modules/underscore/underscore.js'], dest: 'public/javascripts/libs/underscore.js'},
							{expand: false, src: ['node_modules/backbone/backbone.js'], dest: 'public/javascripts/libs/backbone.js'}]},
			js: {files: [{expand: true, cwd: 'frontend/javascripts/', src: ['**'], dest: 'public/javascripts/'}]},
			resources: {files: [{expand: true, cwd: 'frontend/resources/', src: ['**'], dest: 'public/resources/'}]}
		},

		requirejs: {
			options: {
				baseUrl: '.',
				appDir: 'frontend/javascripts',
				mainConfigFile: 'frontend/javascripts/main.js',
				optimize: 'uglify2',
				generateSourceMaps: false,
				preserveLicenseComments: true,
				useStrict: true,
				removeCombined: false,
				modules: [{
					name: 'main'
				}]
			},

			main: {
				options: {
					dir: 'public/javascripts'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	
	grunt.registerTask('common', ['jshint', 'jade', 'stylus', 'clean', 'copy']);

	grunt.registerTask('default', ['common']);
	grunt.registerTask('release', ['common', 'requirejs']);
};

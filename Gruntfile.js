/* global module */
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		timestamp: grunt.template.today('yyyymmddhhMMssl'),

		devMediaDir: 'fish/static-dev',
		devCssDir: '<%= devMediaDir %>/css',
		devScssDir: '<%= devMediaDir %>/scss',
		devJsDir: '<%= devMediaDir %>/js',
		devImgDir: '<%= devMediaDir %>/img',

		buildDir: 'fish/static',
		builtCssDir: '<%= buildDir %>/css',
		builtJsDir: '<%= buildDir %>/js',
		builtImgDir: '<%= buildDir %>/img',

		// We've got things in a /build/ dir so we can just chop that to return
		// to a clean state
		clean: ['<%= buildDir %>/'],

		jshint: {
			options: {
				boss: true,
				browser: true,
				curly: false,
				devel: true,
				eqeqeq: false,
				eqnull: true,
				expr: true,
				evil: true,
				immed: false,
				laxcomma: true,
				newcap: false,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: true
			},
			all: [
				'<%= devJsDir %>/**/*.js',
				'Gruntfile.js'
			]
		},

		sass: {
			dev: {
				files: {
					'<%= devCssDir %>/styles.css': '<%= devScssDir %>/styles.scss',
				},
				options: {
					style: 'expanded',
					compass: true
				}
			},
			build: {
				files: {
					'<%= builtCssDir %>/styles.css': '<%= devScssDir %>/styles.scss',
				},
				options: {
					style: 'compressed',
					compass: true
				}
			}
		},

		watch: {
			css: {
				files: [
					'<%= devScssDir %>/**/*.scss'
				],
				tasks: ['sass:dev']
			},
			scripts: {
				files: [
					'<%= devJsDir %>/**/*.js'
				],
				tasks: ['jshint']
			}
		},

		copy: {
			// Copy already minified javascript
			js: {
				files: [
					{
						dest: '<%= builtJsDir %>/',
						src: ['js/**/*'],
						expand: true,
						cwd: '<%= devMediaDir %>/'
					}
				]
			},
			images: {
				files: [
					{
						dest: '<%= buildDir %>/',
						src: ['img/**/*'],
						expand: true,
						cwd: '<%= devMediaDir %>/'
					}
				]
			}
		},

		shell: {
			// Shell command for running Django server
			devserver: {
				command: 'python manage.py runserver',
				options: {
					stdout: true,
					stderr: true
				}
			},
			deploy: {
				command: 'git push heroku master',
				options: {
					stdout: true,
					stderr: true
				}
			},
			removePYC: {
				command: 'find . -name "*.pyc" -exec rm -rf {} \\;',
				options: {
					stdout: true,
					stderr: true
				}
			}
		},

		concurrent: {
			serve: {
				tasks: ['watch', 'shell:devserver'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');

	// Here's our build process
	grunt.registerTask('build', [
		// Remove previously built files
		'clean',
		// Remove pyc files
		'shell:removePYC',
		// Check all our JS is ship-shape – we skip some files in .jshintignore
		'jshint',
		// Create our CSS files with sass
		'sass:build',
		// Copy things into the build dir (nothing special to do there)
		'copy'
	]);

	// Local server task
	grunt.registerTask('serve', [
		// Compile sass before we start serving
		'sass:dev',
		// Watch all the thingz and run the devserver
		'concurrent:serve'
	]);

	// Deploy task
	grunt.registerTask('deploy', [
		// Build all the thingz first
		'build',
		// Then push to Heroku
		'shell:deploy'
	]);

	// Default: serve! Add `test` task to this when we have one
	grunt.registerTask('default', ['serve']);
};

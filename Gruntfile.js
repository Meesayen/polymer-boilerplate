module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-myth');

  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');


  grunt.initConfig({

    config: {
      paths: {
        base: '',
        static: '<%= config.paths.base %>/public',
        js: '<%= config.paths.static %>/js',
        css: '<%= config.paths.static %>/css',
        elements: '<%= config.paths.static %>/components',
        bundles: '<%= config.paths.static %>/bundles',
        dist: '<%= config.paths.static %>/dist',
        distBundles: '<%= config.paths.dist %>/bundles'
      }
    },

    clean: {
      default: {
        options: {
          force: true
        },
        src: ['<%= config.paths.distBundles %>/*']
      }
    },
    vulcanize: {
      default: {
        options: {
          csp: true,
          inline: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.paths.bundles %>/',
          src: ['**/*.html'],
          dest: '<%= config.paths.distBundles %>/'
        }]
      },
    },
    uglify: {
      default: {
        files: [{
          expand: true,
          cwd: '<%= config.paths.distBundles %>/',
          src: ['**/*.js'],
          dest: '<%= config.paths.distBundles %>/'
        }]
      }
    },
    htmlmin: {
      default: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.paths.distBundles %>/',
          src: ['**/*.html'],
          dest: '<%= config.paths.distBundles %>/'
        }]
      }
    },

    watch: {
      polymer: {
        files: [
          '<%= config.paths.elements %>/**/*.html',
          '<%= config.paths.elements %>/**/*.css'
        ],
        tasks: ['build:dev'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['<%= config.paths.css %>/**/*.css'],
        options: {
          livereload: true,
        }
      }
    }
  });



  grunt.registerTask('build:prod', [
    'clean',
    'vulcanize',
    'uglify',
    'htmlmin'
  ]);
  grunt.registerTask('build:dev', [
    'clean',
    'vulcanize'
  ]);



};

module.exports = function(grunt) {
  const sass = require('sass');
  require('jit-grunt')(grunt);

  grunt.initConfig({
    sass: {
      development: {
        options: {
          implementation: sass,
          compress: true,
          yuicompress: true,
          optimization: 2,
          sourceMap: false,
        },
        // files: {
        //   "public/assets/css/*.css": "public/assets/scss/*.scss", // destination file and source file
        // }
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'public/assets/scss/',      // Src matches are relative to this path.
            src: ['**/*.scss'], // Actual pattern(s) to match.
            dest: 'public/assets/css/',   // Destination path prefix.
            ext: '.css',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ],
      }
    },
    watch: {
      styles: {
        files: ['public/assets/scss/**/*.scss'], // which files to watch
        tasks: ['sass'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['sass', 'watch']);
};
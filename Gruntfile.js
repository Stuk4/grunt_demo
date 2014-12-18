module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // uglify
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      js: {
        files: [{
          cwd: 'js/src/',  // ruta de nuestro javascript fuente
          expand: true,    // ingresar a las subcarpetas
          src: '*.js',     // patrón relativo a cwd
          dest: 'js/min/'  // destino de los archivos compresos
        }]
      }
    }
 });


  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default',['uglify']);


  // tarea en grunt que le dice que debe pintar algo
  grunt.registerTask('pinta', function(){

  	require('logfile-grunt')(grunt, { filePath: './logs/MyDevLog.txt', clearLogFile: false });
  	grunt.log.write('grunt xD');

  });

};
define(function(require) {
   require('angular')
   .module('app.categoria.services', [])
   .service('CategoriaService', require('app/modules/categoria/services/CategoriaService'));
});
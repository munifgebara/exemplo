define(function(require) {
   require('angular')
   .module('app.grupo.services', [])
   .service('GrupoService', require('app/modules/grupo/services/GrupoService'));
});
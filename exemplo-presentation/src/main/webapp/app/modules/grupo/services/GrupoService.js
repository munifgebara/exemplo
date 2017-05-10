define(['app/apiLocations'], function(APILocation) {

	GrupoService.$inject = ['GumgaRest'];

	function GrupoService(GumgaRest) {
    	var Service = new GumgaRest(APILocation.apiLocation + '/api/grupo');

    	return Service;
    }

  	return GrupoService;
});
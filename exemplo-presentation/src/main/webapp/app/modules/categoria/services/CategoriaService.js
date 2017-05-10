define(['app/apiLocations'], function(APILocation) {

	CategoriaService.$inject = ['GumgaRest'];

	function CategoriaService(GumgaRest) {
    	var Service = new GumgaRest(APILocation.apiLocation + '/api/categoria');

    	return Service;
    }

  	return CategoriaService;
});
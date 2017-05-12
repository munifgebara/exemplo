package br.com.gumgademo.exemplo.api;

import br.com.gumgademo.exemplo.application.service.ProdutoService;
import br.com.gumgademo.exemplo.domain.model.Produto;
import br.com.gumgademo.exemplo.utils.ExemploUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import io.gumga.annotations.GumgaSwagger;
import io.gumga.application.GumgaService;
import io.gumga.presentation.GumgaAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMethod;
import io.gumga.presentation.RestResponse;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.BindingResult;
import io.gumga.application.GumgaTempFileService;
import io.gumga.core.GumgaThreadScope;
import io.gumga.domain.GumgaTenancyUtils;
import io.gumga.domain.domains.GumgaImage;
import io.gumga.presentation.GumgaAPI;
import org.springframework.web.bind.annotation.RequestMapping;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/produto")
@Transactional
public class ProdutoAPI extends GumgaAPI<Produto, Long> {

    @Autowired
    public ProdutoAPI(GumgaService<Produto, Long> service) {
        super(service);
    }

    @Transactional
    @RequestMapping(value = "transfere", method = RequestMethod.PUT)
    public Produto transfere(@RequestBody TranferenciaDTO tranferenciaDTO) {
        Produto produto = service.view(tranferenciaDTO.id);
        GumgaTenancyUtils.changeOi(tranferenciaDTO.novoOi, produto); //NUNCA NA API
        return produto;
    }

    @Override
    @GumgaSwagger
    @Transactional
    @ResponseStatus(value = HttpStatus.OK)
    @ApiOperation(value = "delete", notes = "Deleta objeto com o id correspondente.")
    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public RestResponse<Produto> delete(Long l) {
        GumgaThreadScope.ignoreCheckOwnership.set(Boolean.TRUE);
        return super.delete(l); //To change body of generated methods, choose Tools | Templates.
    }

    @RequestMapping(value = "mapa/{id}", method = RequestMethod.GET)
    public Map mapa(@PathVariable(value = "id") Long id) {
        Produto view = service.view(id);
        return ExemploUtil.object2Map(view);
    }

    @RequestMapping(value = "mapa2/{id}", method = RequestMethod.GET)
    public Map mapa2(@PathVariable(value = "id") Long id) {
        Produto view = service.view(id);
        Map toReturn = new HashMap();
        toReturn.put("QTD", view.getQuantidade());
        toReturn.put("NOME", view.getNome());
        return toReturn;
    }

    @RequestMapping(value = "debug", method = RequestMethod.GET)
    public Map debug() {
        Map toReturn = new HashMap();
        toReturn.put("authorizationResponse", GumgaThreadScope.authorizationResponse.get());
        toReturn.put("gumgaToken", GumgaThreadScope.gumgaToken.get());
        toReturn.put("ignoreCheckOwnership", GumgaThreadScope.ignoreCheckOwnership.get());
        toReturn.put("ip", GumgaThreadScope.ip.get());
        toReturn.put("login", GumgaThreadScope.login.get());
        toReturn.put("operationKey", GumgaThreadScope.operationKey.get());
        toReturn.put("organization", GumgaThreadScope.organization.get());
        toReturn.put("organizationCode", GumgaThreadScope.organizationCode.get());
        toReturn.put("organizationId", GumgaThreadScope.organizationId.get());
        toReturn.put("softwareName", GumgaThreadScope.softwareName.get());
        toReturn.put("userRecognition", GumgaThreadScope.userRecognition.get());
        return toReturn;
    }

}

class TranferenciaDTO {

    public Long id;
    public String novoOi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNovoOi() {
        return novoOi;
    }

    public void setNovoOi(String novoOi) {
        this.novoOi = novoOi;
    }

}

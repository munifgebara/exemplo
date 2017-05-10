package br.com.gumgademo.exemplo.application.repository;

import io.gumga.domain.repository.GumgaCrudRepository;
import br.com.gumgademo.exemplo.domain.model.Produto;

public interface ProdutoRepository extends GumgaCrudRepository<Produto, Long> {}
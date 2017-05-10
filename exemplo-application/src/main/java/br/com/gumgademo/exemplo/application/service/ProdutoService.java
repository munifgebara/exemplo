package br.com.gumgademo.exemplo.application.service;

import io.gumga.application.GumgaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import org.hibernate.Hibernate;

import br.com.gumgademo.exemplo.application.repository.ProdutoRepository;
import br.com.gumgademo.exemplo.domain.model.Produto;


@Service
@Transactional
public class ProdutoService extends GumgaService<Produto, Long> {

private final ProdutoRepository repository;

@Autowired
public ProdutoService(ProdutoRepository repository) {
super(repository);
this.repository = repository;
}

}
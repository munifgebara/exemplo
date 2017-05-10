package br.com.gumgademo.exemplo.application.service;

import io.gumga.application.GumgaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import org.hibernate.Hibernate;

import br.com.gumgademo.exemplo.application.repository.GrupoRepository;
import br.com.gumgademo.exemplo.domain.model.Grupo;

import br.com.gumgademo.exemplo.domain.model.Produto;

@Service
@Transactional
public class GrupoService extends GumgaService<Grupo, Long> {

private final GrupoRepository repository;

@Autowired
public GrupoService(GrupoRepository repository) {
super(repository);
this.repository = repository;
}

@Transactional
public Grupo loadGrupoFat(Long id) {
Grupo obj = view(id);

    Hibernate.initialize(obj.getProdutos());


return obj;
}
}
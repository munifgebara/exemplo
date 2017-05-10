package br.com.gumgademo.exemplo.application.service;

import io.gumga.application.GumgaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import org.hibernate.Hibernate;

import br.com.gumgademo.exemplo.application.repository.CategoriaRepository;
import br.com.gumgademo.exemplo.domain.model.Categoria;


@Service
@Transactional
public class CategoriaService extends GumgaService<Categoria, Long> {

private final CategoriaRepository repository;

@Autowired
public CategoriaService(CategoriaRepository repository) {
super(repository);
this.repository = repository;
}

}
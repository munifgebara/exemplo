package br.com.gumgademo.exemplo.application.repository;

import io.gumga.domain.repository.GumgaCrudRepository;
import br.com.gumgademo.exemplo.domain.model.Categoria;

public interface CategoriaRepository extends GumgaCrudRepository<Categoria, Long> {}
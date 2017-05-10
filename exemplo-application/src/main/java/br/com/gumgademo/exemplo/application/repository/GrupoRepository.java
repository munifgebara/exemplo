package br.com.gumgademo.exemplo.application.repository;

import io.gumga.domain.repository.GumgaCrudRepository;
import br.com.gumgademo.exemplo.domain.model.Grupo;

public interface GrupoRepository extends GumgaCrudRepository<Grupo, Long> {}
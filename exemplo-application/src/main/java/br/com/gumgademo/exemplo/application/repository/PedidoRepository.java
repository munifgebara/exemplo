package br.com.gumgademo.exemplo.application.repository;

import io.gumga.domain.repository.GumgaCrudRepository;
import br.com.gumgademo.exemplo.domain.model.Pedido;

public interface PedidoRepository extends GumgaCrudRepository<Pedido, Long> {}
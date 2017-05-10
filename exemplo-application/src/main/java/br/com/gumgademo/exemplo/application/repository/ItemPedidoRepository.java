package br.com.gumgademo.exemplo.application.repository;

import io.gumga.domain.repository.GumgaCrudRepository;
import br.com.gumgademo.exemplo.domain.model.ItemPedido;

public interface ItemPedidoRepository extends GumgaCrudRepository<ItemPedido, Long> {}
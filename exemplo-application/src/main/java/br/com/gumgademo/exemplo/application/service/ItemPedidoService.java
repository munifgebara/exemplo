package br.com.gumgademo.exemplo.application.service;

import io.gumga.application.GumgaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import org.hibernate.Hibernate;

import br.com.gumgademo.exemplo.application.repository.ItemPedidoRepository;
import br.com.gumgademo.exemplo.domain.model.ItemPedido;


@Service
@Transactional
public class ItemPedidoService extends GumgaService<ItemPedido, Long> {

private final ItemPedidoRepository repository;

@Autowired
public ItemPedidoService(ItemPedidoRepository repository) {
super(repository);
this.repository = repository;
}

}
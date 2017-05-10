package br.com.gumgademo.exemplo.application.service;

import io.gumga.application.GumgaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import org.hibernate.Hibernate;

import br.com.gumgademo.exemplo.application.repository.PedidoRepository;
import br.com.gumgademo.exemplo.domain.model.Pedido;

import br.com.gumgademo.exemplo.domain.model.ItemPedido;

@Service
@Transactional
public class PedidoService extends GumgaService<Pedido, Long> {

    private final PedidoRepository repository;

    @Autowired
    public PedidoService(PedidoRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Transactional
    public Pedido loadPedidoFat(Long id) {
        Pedido obj = view(id);

        Hibernate.initialize(obj.getItens());

        return obj;
    }
}

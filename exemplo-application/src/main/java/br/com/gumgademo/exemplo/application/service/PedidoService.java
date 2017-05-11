package br.com.gumgademo.exemplo.application.service;

import io.gumga.application.GumgaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import org.hibernate.Hibernate;

import br.com.gumgademo.exemplo.application.repository.PedidoRepository;
import br.com.gumgademo.exemplo.application.repository.ProdutoRepository;
import br.com.gumgademo.exemplo.domain.model.Pedido;

import br.com.gumgademo.exemplo.domain.model.ItemPedido;
import br.com.gumgademo.exemplo.domain.model.Produto;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


import  com.google.common.collect.FluentIterable;

@Service
@Transactional
public class PedidoService extends GumgaService<Pedido, Long> {

    //@PersistenceContext
    //EntityManager entityman;
    private final PedidoRepository repository;
    @Autowired
    private ProdutoRepository produtoRepository;

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

    @Override
    public void afterSave(Pedido entity) {
        for (ItemPedido item : entity.getItens()) {
            if (item.getProduto().getId() == null) {
                continue;
            } 
            Produto produto = produtoRepository.findOne(item.getProduto().getId());
            produto.setQuantidade(produto.getQuantidade() - item.getQuantidade());
        }
    }

    @Override
    public void beforeSave(Pedido entity) {
        for (ItemPedido item : entity.getItens()) {
            //Produto produto = produtoRepository.findOne(item.getProduto().getId());;
            // Query q = entityman.createQuery("from Produto a where a.sku = :sku");
            //q.setParameter("sku", item.getProduto().getSku());
            //Object singleResult = q.getSingleResult();
            Produto produto = produtoRepository.findBySku(item.getProduto().getSku());
            if (produto == null) {
                item.setProduto(produtoRepository.save(item.getProduto()));                
            } else {
                if (item.getQuantidade() > produto.getQuantidade()) {
                    throw new RuntimeException("Sem estoque do produto" + produto.getNome());

                }
            }
        }
        
        
    }

}

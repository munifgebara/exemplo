/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.gumgademo.exemplo.utils;

import br.com.gumgademo.exemplo.anotacoes.Mapeavel;
import io.gumga.domain.GumgaTenancyUtils;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author cesar
 */
public class ExemploUtil {

    public static Map object2Map(Object obj) {
        Map toReturn = new HashMap();
        Class<?> classe = obj.getClass();
        Field[] declaredFields = classe.getDeclaredFields();
        for (Field atributo : declaredFields) {
            try {
                if (!atributo.isAnnotationPresent(Mapeavel.class)) {
                    continue;
                }
                Mapeavel mapeavel = atributo.getAnnotation(Mapeavel.class);
                String chave = mapeavel.chave();
                atributo.setAccessible(true);  //PARA LER ATRIBUTOS PRIVADOS
                Object valor = atributo.get(obj);
                toReturn.put(chave, valor);
            } catch (IllegalArgumentException ex) {
                Logger.getLogger(ExemploUtil.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalAccessException ex) {
                Logger.getLogger(ExemploUtil.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return toReturn;
    }

}

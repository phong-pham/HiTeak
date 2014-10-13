package com.hiteak.service.impl;

import com.hiteak.domain.Product;
import com.hiteak.repo.ProductRepository;
import com.hiteak.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by phongpham on 9/11/14.
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findProductById(productId);
    }
}

package com.hiteak.repo;

import com.hiteak.domain.Product;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
public interface ProductRepository {

    public Product persistProduct(Product product);
    public List<Product> findProductByCategory(Integer categoryId);

}

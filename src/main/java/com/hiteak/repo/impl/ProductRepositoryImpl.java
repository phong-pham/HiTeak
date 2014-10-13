package com.hiteak.repo.impl;

import com.hiteak.domain.Product;
import com.hiteak.repo.ProductRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
@Repository
public class ProductRepositoryImpl extends AbstractRepositoryImpl implements ProductRepository{
    @Override
    public Product persistProduct(Product product) {
        if(product.getProductId() == null){
            product.setProductId(getNextSequence("product"));
        }
        mongoOperations.save(product);
        return product;
    }

    @Override
    public List<Product> findProductByCategory(Integer categoryId) {
        Query query = new Query(Criteria.where("categoryId").is(categoryId));
        return mongoOperations.find(query, Product.class);
    }

    @Override
    public Product findProductById(Long productId) {
        return mongoOperations.findById(productId, Product.class);
    }
}

package com.hiteak.service.impl;

import com.hiteak.domain.Image;
import com.hiteak.domain.Product;
import com.hiteak.repo.ImageRepository;
import com.hiteak.repo.ProductRepository;
import com.hiteak.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by phongpham on 9/11/14.
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findProductById(productId);
    }

    @Override
    public Image uploadImage(Image image) {
        return imageRepository.persistImage(image);
    }

    @Override
    public List<Image> getImageByType(String imageType) {
        return imageRepository.getImagesByType(imageType);
    }
}

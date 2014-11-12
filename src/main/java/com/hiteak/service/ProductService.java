package com.hiteak.service;

import com.hiteak.domain.Image;
import com.hiteak.domain.Product;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
public interface ProductService {

    public Product getProductById(Long productId);
    public Image uploadImage(Image image);
    public List<Image> getImageByType(String imageType);
}

package com.hiteak.repo;

import com.hiteak.domain.Image;

import java.util.List;

/**
 * Created by phongpham on 11/9/14.
 */
public interface ImageRepository {

    public Image persistImage(Image image);
    public List<Image> getImagesByType(String imageType);
}

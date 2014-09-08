package com.hiteak.service;

import com.hiteak.domain.Category;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
public interface CategoryService {

    public List<Category> getCategoriesById(Integer categoryId, boolean getSubCategories, boolean getProduct, boolean byParent);
    public List<Category> buildBreadCrumb(Category category);
}

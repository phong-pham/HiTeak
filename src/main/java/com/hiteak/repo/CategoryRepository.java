package com.hiteak.repo;

import com.hiteak.domain.Category;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
public interface CategoryRepository {

    public Category persistCategory(Category category);
    public List<Category> findCategoriesById(Integer categoryId, boolean byParent);
}

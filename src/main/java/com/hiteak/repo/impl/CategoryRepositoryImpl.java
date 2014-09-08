package com.hiteak.repo.impl;

import com.hiteak.domain.Category;
import com.hiteak.repo.CategoryRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
@Repository
public class CategoryRepositoryImpl extends AbstractRepositoryImpl implements CategoryRepository{

    @Override
    public Category persistCategory(Category category) {
        if(category.getCategoryId() == null){
            category.setCategoryId(getNextSequence("category").intValue());
        }
        mongoOperations.save(category);
        return category;
    }

    @Override
    public List<Category> findCategoriesById(Integer categoryId, boolean byParent) {
        Query query = null;
        if(byParent){
            query = new Query(Criteria.where("parentCategoryId").is(categoryId));
        }else{
            query = new Query(Criteria.where("categoryId").is(categoryId));
        }
        return mongoOperations.find(query, Category.class);
    }
}

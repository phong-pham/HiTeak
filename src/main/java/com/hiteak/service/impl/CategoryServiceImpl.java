package com.hiteak.service.impl;

import com.hiteak.domain.Category;
import com.hiteak.repo.CategoryRepository;
import com.hiteak.repo.ProductRepository;
import com.hiteak.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Category> getCategoriesById(Integer categoryId, boolean getSubCategories, boolean getProduct, boolean byParent) {
        List<Category> result = categoryRepository.findCategoriesById(categoryId, byParent);
        if(getSubCategories){
            for(Category category : result){
                category.setSubCategories(categoryRepository.findCategoriesById(category.getCategoryId(), true));
            }
        }
        if(getProduct){
            for(Category category : result){
                category.setProducts(productRepository.findProductByCategory(category.getCategoryId()));
                for(Category subCategory: category.getSubCategories()){
                    subCategory.setProducts(productRepository.findProductByCategory(subCategory.getCategoryId()));
                }
            }
        }
        return result;
    }

    @Override
    public List<Category> buildBreadCrumb(Category category) {
        List<Category> result = new ArrayList<Category>();
        List<Category> categoryList = new ArrayList<Category>();
        List<Category> tempList = new ArrayList<Category>();
        tempList.add(category);
        while(tempList.size() > 0){
            categoryList.add(tempList.get(0));
            tempList = categoryRepository.findCategoriesById(tempList.get(0).getParentCategoryId(), false);
            if(tempList.size() == 0){
                break;
            }
            Category temp = tempList.get(0);
            if(temp.getCategoryName() != null && category.getCategoryName().trim().length() > 0){
                category.setParentCategoryName(temp.getCategoryName());     //GET HIGHEST PARENT NAME
            }
            if(category.getCategoryDescription() == null
                    && temp.getCategoryDescription() != null && temp.getCategoryDescription().trim().length() > 0){
                category.setCategoryDescription(temp.getCategoryDescription());
            }
        }
        for(int i=(categoryList.size()-1); i>=0; i--){
            Category temp = categoryList.get(i);
            if(temp.getParentCategoryId() != -1){
                result.add(temp);
            }
        }
        return result;
    }
}

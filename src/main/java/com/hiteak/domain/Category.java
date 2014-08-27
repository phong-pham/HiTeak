package com.hiteak.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by phongpham on 8/24/14.
 */
public class Category {

    private Integer categoryId;
    private String categoryName;
    private String categoryDescription;
    private Integer parentCategoryId;
    private String imageSource;
    private List<Category> subCategories = new ArrayList<Category>();
    private List<Product> products = new ArrayList<Product>();

    public Category(){

    }

    public Category(Integer categoryId, String categoryName, String imageSource, Integer parentCategoryId){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.imageSource = imageSource;
        this.parentCategoryId = parentCategoryId;
    }

    public Category(Integer categoryId, String categoryName, List<Category> subCategories, Integer parentCategoryId){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.subCategories = subCategories;
        this.parentCategoryId = parentCategoryId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(Integer parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public List<Category> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<Category> subCategories) {
        this.subCategories = subCategories;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}

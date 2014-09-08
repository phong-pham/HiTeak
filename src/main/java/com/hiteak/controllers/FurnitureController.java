package com.hiteak.controllers;

import com.hiteak.domain.Category;
import com.hiteak.domain.Product;
import com.hiteak.repo.CustomerServiceRepository;
import com.hiteak.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by phongpham on 8/23/14.
 */
@Controller
public class FurnitureController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CustomerServiceRepository customerServiceRepository;

    @RequestMapping(value = "{path}", method = RequestMethod.GET)
    public String getHomePage(ModelMap modelMap, @PathVariable String path,
                              @RequestParam(required = false) Integer categoryId){
        int carouselHeight = 200;
        String prefixImg = "banner";
        List<String> carouselImages = new ArrayList<String>();

        String result = path;
        if(path.equalsIgnoreCase("home")){
            carouselHeight = 500;
            prefixImg = "home";
            List<Category> categoryList = categoryService.getCategoriesById(-1, true, false, true);
            System.out.println(categoryList.size());
            modelMap.addAttribute("categories", categoryList);
        }else if(path.equalsIgnoreCase("customerService")){
            modelMap.addAttribute("howTos", customerServiceRepository.getCustomerService(false));
            modelMap.addAttribute("faqs", customerServiceRepository.getCustomerService(true));
        }else{
            if(path.equalsIgnoreCase("productList") && categoryId != null){
                List<Category> categoryList = categoryService.getCategoriesById(categoryId, true, true, false);
                if(categoryList.size() > 0){
                    Category category = categoryList.get(0);
                    modelMap.addAttribute("category", category);
                    modelMap.addAttribute("hasSubCategory", category.getSubCategories().size() > 0);
                    modelMap.addAttribute("hasProductList", hasProductList(category));
                    modelMap.addAttribute("showPrice", false);
                    List<Category> breadcrumbs = categoryService.buildBreadCrumb(category);
                    modelMap.addAttribute("breadcrumb", breadcrumbs);
                    modelMap.addAttribute("hasBreadcrumb", breadcrumbs.size() > 0);
                }

            }
        }
        for(int i=0; i<5; i++){
            carouselImages.add(prefixImg + (i+1));
        }
        modelMap.addAttribute("carouselHeight", carouselHeight);
        modelMap.addAttribute("carouselImages", carouselImages);
        List<Category> temp = categoryService.getCategoriesById(-1, true, false, true);
        List<Category> categoriesForMenu = new ArrayList<Category>();
        for(Category category : temp){
            for(Category subCategory : category.getSubCategories()){
                List<Category> menuCategory = categoryService.getCategoriesById(subCategory.getCategoryId(), true, false, false);
                categoriesForMenu.addAll(menuCategory);
            }
        }
        modelMap.addAttribute("categoriesForMenu", categoriesForMenu);
        return "furniture/" + result;
    }

    public Category generateProductCategory(Integer categoryId){
//        Category result = findCategory(categoryId, categories);
//        if(result != null){
//            Category parentCategory = findCategory(result.getParentCategoryId(), categories);
//            if((result.getCategoryDescription() == null || result.getCategoryDescription().trim().length() == 0)
//                && parentCategory != null){
//                result.setCategoryDescription(parentCategory.getCategoryDescription());
//            }
//            if(parentCategory != null){
//                result.setParentCategoryName(parentCategory.getCategoryName());
//            }
//            result.setSubCategories(findSubCategories(categoryId));
//        }
//        return result;
        return null;
    }

    public Category findCategory(Integer categoryId, List<Category> categoryList){
        Category result = null;
        for(Category category : categoryList){
            if(category.getCategoryId() == categoryId){
                result = category.copy();
                break;
            }
            result = findCategory(categoryId, category.getSubCategories());
            if(result != null){
                break;
            }
        }
        return  result;
    }

    public List<Category> findSubCategories(Integer categoryId){
//        List<Category> subCategories = new ArrayList<Category>();
//        for(Category category : categories){
//            if(category.getParentCategoryId() == categoryId && category.getCategoryId() != categoryId){
//                subCategories.add(category);
//            }
//        }
//        return  subCategories;
        return null;
    }

    public boolean hasProductList(Category category){
        boolean hasProductList = category.getProducts().size() > 0;
        if(!hasProductList){
            for(Category subCategory : category.getSubCategories()){
                hasProductList = hasProductList(subCategory);
                if(hasProductList){
                    break;
                }
            }
        }
        return hasProductList;
    }

    public List<Category> buildBreadcrumb(Category category){
//        List<Category> result = new ArrayList<Category>();
//        if(category != null){
//            List<Category> tempList = new ArrayList<Category>();
//            tempList.add(category);
//            Category temp = category;
//            while(temp.getCategoryId() != temp.getParentCategoryId()){
//                temp = findCategory(temp.getParentCategoryId(), categories);
//                if(temp != null){
//                    tempList.add(temp);
//                }
//            }
//            for(int i=tempList.size()-1; i>=0; i--){
//                if(i == (tempList.size() - 1)){
//                    category.setParentCategoryName(tempList.get(i).getCategoryName());
//                    category.setParentCategoryId(tempList.get(i).getCategoryId());
//                }else{
//                    result.add(tempList.get(i));
//                }
//            }
//        }
//        return result;
        return null;
    }
}

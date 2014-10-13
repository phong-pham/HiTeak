package com.hiteak.controllers;

import com.hiteak.domain.Category;
import com.hiteak.domain.Product;
import com.hiteak.repo.CustomerServiceRepository;
import com.hiteak.service.CategoryService;
import com.hiteak.service.ProductService;
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
    private ProductService productService;

    @Autowired
    private CustomerServiceRepository customerServiceRepository;

    @RequestMapping(value = "{path}", method = RequestMethod.GET)
    public String getHomePage(ModelMap modelMap, @PathVariable String path,
                              @RequestParam(required = false) Integer categoryId,
                              @RequestParam(required = false) Long productId){
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
        }else if(path.equalsIgnoreCase("productList") && categoryId != null){
            Category category = categoryService.getCategoryById(categoryId, true, true);
            if(category != null){
                modelMap.addAttribute("category", category);
                modelMap.addAttribute("hasSubCategory", category.getSubCategories().size() > 0);
                modelMap.addAttribute("hasProductList", hasProductList(category));
                modelMap.addAttribute("showPrice", false);
                List<Category> breadcrumbs = categoryService.buildBreadCrumb(category);
                modelMap.addAttribute("breadcrumb", breadcrumbs);
                modelMap.addAttribute("hasBreadcrumb", breadcrumbs.size() > 0);
            }
        }else if(path.equalsIgnoreCase("product") && productId != null){
            Product product = productService.getProductById(productId);
            if(product != null){
                modelMap.addAttribute("product", product);
                Category category = categoryService.getCategoryById(product.getCategoryId(), true, false);
                if(category != null){
                    modelMap.addAttribute("category", category);
                    List<Category> breadcrumbs = categoryService.buildBreadCrumb(category);
                    modelMap.addAttribute("breadcrumb", breadcrumbs);
                    modelMap.addAttribute("hasBreadcrumb", breadcrumbs.size() > 0);
                    modelMap.addAttribute("showPrice", false);
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


}

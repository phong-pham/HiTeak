package com.hiteak.controllers;

import com.hiteak.domain.Category;
import com.hiteak.domain.Product;
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

    private static final List<Category> categories = new ArrayList<Category>();

    static {
        List<Category> outdoorCategories = new ArrayList<Category>();
        Category outdoorChair = new Category(1, "Chairs", "furniture/images/cat_1.jpg", 0);

        Category reclining = new Category(11, "Reclining", "furniture/images/outdoor/chair/out_rec_1.jpg", 1);
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC275", "", "furniture/images/outdoor/chairs/out_rec_1.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC669", "", "furniture/images/outdoor/chairs/out_rec_2.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC173", "", "furniture/images/outdoor/chairs/out_rec_3.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC248", "", "furniture/images/outdoor/chairs/out_rec_4.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC298", "", "furniture/images/outdoor/chairs/out_rec_5.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC363", "", "furniture/images/outdoor/chairs/out_rec_6.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("5 Position Chair", "HLAC388", "", "furniture/images/outdoor/chairs/out_rec_7.jpg", 100d, 50d));
        reclining.getProducts().add(new Product("Westimster 5 Position Chair", "HLAC393", "", "furniture/images/outdoor/chairs/out_rec_8.jpg", 100d, 50d));
//        outdoorChair.getSubCategories().add(reclining);
        categories.add(reclining);

        Category folding = new Category(12, "Folding", "furniture/images/outdoor/chair/out_folding_1.jpg", 1);
//        outdoorChair.getSubCategories().add(folding);
        categories.add(folding);

        Category stacking = new Category(13, "Stacking", "furniture/images/outdoor/chair/out_stacking_1.jpg", 1);
//        outdoorChair.getSubCategories().add(stacking);
        categories.add(stacking);

        Category oneSeater = new Category(14, "One Seater", "furniture/images/outdoor/chair/out_oseater_1.jpg", 1);
//        outdoorChair.getSubCategories().add(oneSeater);
        categories.add(oneSeater);
        outdoorCategories.add(outdoorChair);
        categories.add(outdoorChair);

        Category outdoorBench = new Category(2, "Benches", "furniture/images/cat_2.jpg", 0);
        outdoorCategories.add(outdoorBench);
        categories.add(outdoorBench);

        Category outdoorTable = new Category(3, "Tables", "furniture/images/cat_3.jpg", 0);
        outdoorCategories.add(outdoorTable);
        categories.add(outdoorTable);

        Category outdoorLounger = new Category(4, "Loungers", "furniture/images/cat_4.jpg", 0);
        outdoorCategories.add(outdoorLounger);
        categories.add(outdoorLounger);

        Category outdoorSet = new Category(5, "Sets", "furniture/images/cat_5.jpg", 0);
        outdoorCategories.add(outdoorSet);
        categories.add(outdoorSet);

        Category outdoorCategory = new Category(0, "Outdoor Products", outdoorCategories, 0);
        outdoorCategory.setCategoryDescription("HL Distribution, Inc. produces tables, chairs, sunloungers, trolleys... for garden, swimming pool, bathroom, tourist boat with teak wood. This kind of wood contains high natural teak oil; protect the furniture from wood-worm eating and severe weather conditions. We also combine teak wood with other material such as stainless steel, aluminum, iron, textilene... to diversify our products.");
        categories.add(outdoorCategory);

        List<Category> indoorCategories = new ArrayList<Category>();

        Category indoorChair = new Category(7, "Chairs", "furniture/images/cat_6.jpg", 6);
        indoorCategories.add(indoorChair);
        categories.add(indoorChair);

        Category indoorTable = new Category(8, "Tables", "furniture/images/cat_7.jpg", 6);
        indoorCategories.add(indoorTable);
        categories.add(indoorTable);

        Category indoorBedroom = new Category(9, "Bedroom Sets", "furniture/images/cat_8.jpg", 6);
        indoorCategories.add(indoorBedroom);
        categories.add(indoorBedroom);

        Category indoorDining = new Category(10, "Dining Sets", "furniture/images/cat_9.jpg", 6);
        indoorCategories.add(indoorDining);
        categories.add(indoorDining);

        Category indoorCategory = new Category(6, "Indoor Products", indoorCategories, 6);
        indoorCategory.setCategoryDescription("We produce indoor furniture for bedroom, dining room, bathroom, kitchen cabinet, door,... with beech wood imported from Europe. This kind of wood has bright color and stable for using. Our designers create many different ranges of products: classic, modern or combine both to meet all demands of customers.");
        categories.add(indoorCategory);
    }

    @RequestMapping(value = "{path}", method = RequestMethod.GET)
    public String getHomePage(ModelMap modelMap, @PathVariable String path,
                              @RequestParam(required = false) Integer categoryId){
        int carouselHeight = 200;
        String prefixImg = "";
        List<String> carouselImages = new ArrayList<String>();

        String result = "home";
        if(path.equalsIgnoreCase("home")){
            carouselHeight = 500;
            prefixImg = "home";
            List<Category> categoryList = new ArrayList<Category>();
            for(Category category : categories){
                System.out.println(category.getCategoryName() + ":::" + category.getSubCategories().size());
                if(category.getCategoryId() == category.getParentCategoryId()){
                    categoryList.add(category);
                    category.setSubCategories(findSubCategories(category.getCategoryId()));
                }
            }
            modelMap.addAttribute("categories", categoryList);
        }else{
            prefixImg = "banner";
            result = path;
            if(path.equalsIgnoreCase("productList") && categoryId != null){
                Category category = generateProductCategory(categoryId);
                System.out.println(category.getCategoryName() + ":::" + category.getSubCategories());
                modelMap.addAttribute("category", category);
                modelMap.addAttribute("hasSubCategory", category.getSubCategories().size() > 0);
                modelMap.addAttribute("hasProductList", hasProductList(category));
                modelMap.addAttribute("showPrice", false);
            }
        }
        for(int i=0; i<5; i++){
            carouselImages.add(prefixImg + (i+1));
        }
        modelMap.addAttribute("carouselHeight", carouselHeight);
        modelMap.addAttribute("carouselImages", carouselImages);
        return "furniture/" + result;
    }

    public Category generateProductCategory(Integer categoryId){
        Category result = findCategory(categoryId, categories);
        if(result != null){
            Category parentCategory = findCategory(result.getParentCategoryId(), categories);
            if((result.getCategoryDescription() == null || result.getCategoryDescription().trim().length() == 0)
                && parentCategory != null){
                result.setCategoryDescription(parentCategory.getCategoryDescription());
            }
            result.setSubCategories(findSubCategories(categoryId));
            for(Category sub : result.getSubCategories()){
                System.out.println(sub.getCategoryName());
            }
        }
        return result;
    }

    public Category findCategory(Integer categoryId, List<Category> categoryList){
        Category result = null;
        for(Category category : categoryList){
            if(category.getCategoryId() == categoryId){
                result = category;
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
        List<Category> subCategories = new ArrayList<Category>();
        for(Category category : categories){
            if(category.getParentCategoryId() == categoryId && category.getCategoryId() != categoryId){
                subCategories.add(category);
//                subCategories.addAll(category.getSubCategories());
            }
        }
        return  subCategories;
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

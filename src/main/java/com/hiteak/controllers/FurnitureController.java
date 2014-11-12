package com.hiteak.controllers;

import com.hiteak.domain.Category;
import com.hiteak.domain.Image;
import com.hiteak.domain.Product;
import com.hiteak.domain.ResponseWrapper;
import com.hiteak.domain.login.User;
import com.hiteak.repo.CustomerServiceRepository;
import com.hiteak.service.CategoryService;
import com.hiteak.service.ProductService;
import com.hiteak.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by phongpham on 8/23/14.
 */
@Controller
public class FurnitureController extends  AbstractController{

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CustomerServiceRepository customerServiceRepository;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "{path}", method = RequestMethod.GET)
    public String getHomePage(ModelMap modelMap, @PathVariable String path,
                              @RequestParam(required = false) Integer categoryId,
                              @RequestParam(required = false) Long productId,
                              HttpServletRequest request){
        int carouselHeight = 200;
        List<Image> carouselImages = new ArrayList<Image>();

        String result = path;
        if(path.equalsIgnoreCase("home")){
            carouselHeight = 500;
            List<Category> categoryList = categoryService.getCategoriesById(-1, true, false, true);
            System.out.println(categoryList.size());
            modelMap.addAttribute("categories", categoryList);
            modelMap.addAttribute("carouselType", "HOME_SLIDE");
            carouselImages = productService.getImageByType("HOME_SLIDE");
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
        if(!modelMap.containsKey("carouselType")){
            modelMap.addAttribute("carouselType", "BANNER_SLIDE");
            carouselImages = productService.getImageByType("BANNER_SLIDE");
        }

        modelMap.addAttribute("carouselHeight", carouselImages.size() > 0 ? carouselHeight : 20);
        modelMap.addAttribute("carouselImages", carouselImages);
        modelMap.addAttribute("carouselImagesCnt", carouselImages.size());
        List<Category> temp = categoryService.getCategoriesById(-1, true, false, true);
        List<Category> categoriesForMenu = new ArrayList<Category>();
        for(Category category : temp){
            for(Category subCategory : category.getSubCategories()){
                List<Category> menuCategory = categoryService.getCategoriesById(subCategory.getCategoryId(), true, false, false);
                categoriesForMenu.addAll(menuCategory);
            }
        }
        modelMap.addAttribute("categoriesForMenu", categoriesForMenu);

        Cookie userCookie = getCookie(request, "USER_ID");
        if(userCookie != null && userCookie.getValue() != null){
            BigDecimal encryptedUserId = new BigDecimal(userCookie.getValue());
            BigDecimal decryptedUserId = userService.decryptNumber(encryptedUserId);
            if(decryptedUserId != null){
                User user = userService.getUserById(decryptedUserId.longValue());
                if(user != null){
                    modelMap.addAttribute("userName", user.getFirstName() + " " + user.getLastName());
                    modelMap.addAttribute("organizationName", user.getOrganizationName());
                }
            }
        }
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

    @ResponseBody
    @RequestMapping(value = "request-upload-img", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseWrapper doUploadImage(@RequestBody String json){
        ResponseWrapper result = new ResponseWrapper();
        Image image = (Image)convertJson(json, Image.class);
        image = productService.uploadImage(image);
        if(image.getImageId() != null){
            result.setSuccess(true);
            result.setData(image);
        }else{
            result.setSuccess(false);
            result.setMessage("Fail to upload image.");
        }
        return result;
    }

}

package com.hiteak.domain;

/**
 * Created by phongpham on 8/24/14.
 */
public class Product {

    private Integer productId;
    private String productName;
    private String productCode;
    private String productDescription;
    private String imageSource;
    private Double retailPrice;
    private Double specialPrice;

    public Product(){

    }

    public Product(int productId, String name, String code, String description, String imageSource, Double retailPrice, Double specialPrice){
        this.productId = productId;
        this.productName = name;
        this.productCode = code;
        this.productDescription = description;
        this.imageSource = imageSource;
        this.retailPrice = retailPrice;
        this.specialPrice = specialPrice;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public Double getSpecialPrice() {
        return specialPrice;
    }

    public void setSpecialPrice(Double specialPrice) {
        this.specialPrice = specialPrice;
    }
}

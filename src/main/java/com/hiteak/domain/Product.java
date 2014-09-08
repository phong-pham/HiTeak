package com.hiteak.domain;

import com.hiteak.util.DateTimeUtils;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by phongpham on 8/24/14.
 */
@Document
public class Product {

    @Id
    private Long productId;
    private Integer categoryId;
    private String productName;
    private String productCode;
    private String productDescription;
    private String imageSource;
    private Double retailPrice;
    private Double specialPrice;

    private List<Long> childrenProductId = new ArrayList<Long>();
    private Long parentProductId;

    private String createDateTime;
    private Integer createUserId;
    private String updateDateTime;
    private Integer updateUserId;
    private Long effectiveDate;
    private Long expireDate;

    public Product(){
        this.createDateTime = DateTimeUtils.getDateAsString(new Date(), "MM-dd-yyyy HH:mm:ss");
    }

    public Product(Long productId, String name, String code, String description, String imageSource, Double retailPrice, Double specialPrice){
        this.productId = productId;
        this.productName = name;
        this.productCode = code;
        this.productDescription = description;
        this.imageSource = imageSource;
        this.retailPrice = retailPrice;
        this.specialPrice = specialPrice;

        this.createDateTime = DateTimeUtils.getDateAsString(new Date(), "MM-dd-yyyy HH:mm:ss");
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
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

    public List<Long> getChildrenProductId() {
        return childrenProductId;
    }

    public void setChildrenProductId(List<Long> childrenProductId) {
        this.childrenProductId = childrenProductId;
    }

    public Long getParentProductId() {
        return parentProductId;
    }

    public void setParentProductId(Long parentProductId) {
        this.parentProductId = parentProductId;
    }

    public String getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(String createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Integer getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    public String getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(String updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    public Integer getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(Integer updateUserId) {
        this.updateUserId = updateUserId;
    }

    public Long getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(Long effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public Long getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Long expireDate) {
        this.expireDate = expireDate;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this,
                ToStringStyle.MULTI_LINE_STYLE);
    }
}

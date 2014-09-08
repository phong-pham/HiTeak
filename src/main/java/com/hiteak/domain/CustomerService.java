package com.hiteak.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by phongpham on 9/7/14.
 */
@Document
public class CustomerService {
    @Id
    private Long id;
    private String title;
    private String content;
    private int sortOrder;
    private boolean isFaq;
    private boolean isActive = true;

    public CustomerService(){

    }

    public CustomerService(String title, String content, int sortOrder, boolean isFaq){
        this.title = title;
        this.content = content;
        this.sortOrder = sortOrder;
        this.isFaq = isFaq;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public boolean isFaq() {
        return isFaq;
    }

    public void setFaq(boolean isFaq) {
        this.isFaq = isFaq;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}

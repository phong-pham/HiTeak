package com.hiteak.domain;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by phongpham on 11/17/14.
 */
@Document
public class BusinessShow {

    private Long showId;
    private String showLogo;
    private String effectiveDateTime;
    private String expireDateTime;

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public String getShowLogo() {
        return showLogo;
    }

    public void setShowLogo(String showLogo) {
        this.showLogo = showLogo;
    }

    public String getEffectiveDateTime() {
        return effectiveDateTime;
    }

    public void setEffectiveDateTime(String effectiveDateTime) {
        this.effectiveDateTime = effectiveDateTime;
    }

    public String getExpireDateTime() {
        return expireDateTime;
    }

    public void setExpireDateTime(String expireDateTime) {
        this.expireDateTime = expireDateTime;
    }
}

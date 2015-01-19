package com.hiteak.service;

import com.hiteak.domain.BusinessShow;

import java.util.List;

/**
 * Created by phongpham on 1/18/15.
 */
public interface BusinessShowService {

    public BusinessShow persistBusinessShow(BusinessShow businessShow);
    public List<BusinessShow> getActiveBusinessShow(int limit);
}

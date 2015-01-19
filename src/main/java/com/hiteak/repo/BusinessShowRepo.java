package com.hiteak.repo;

import com.hiteak.domain.BusinessShow;

import java.util.List;

/**
 * Created by phongpham on 12/14/14.
 */
public interface BusinessShowRepo {
    public List<BusinessShow> getActiveBusinessShows();
    public BusinessShow persistBusinessShow(BusinessShow businessShow);
}

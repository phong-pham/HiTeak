package com.hiteak.service.impl;

import com.hiteak.domain.BusinessShow;
import com.hiteak.repo.BusinessShowRepo;
import com.hiteak.service.BusinessShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by phongpham on 1/18/15.
 */
@Service
public class BusinessShowServiceImpl implements BusinessShowService {
    @Autowired
    private BusinessShowRepo businessShowRepo;

    @Override
    public BusinessShow persistBusinessShow(BusinessShow businessShow) {
        return businessShowRepo.persistBusinessShow(businessShow);
    }

    @Override
    public List<BusinessShow> getActiveBusinessShow(int limit) {
        List<BusinessShow> list = businessShowRepo.getActiveBusinessShows();
        List<BusinessShow> result = new ArrayList<BusinessShow>();
        if(limit >= 0){
            result.addAll(list);
        }else{
            for(int i=0; i<limit && i<list.size(); i++){
                result.add(list.get(i));
            }
        }
        return result;
    }
}

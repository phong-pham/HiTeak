package com.hiteak.repo.impl;

import com.hiteak.domain.CustomerService;
import com.hiteak.repo.CustomerServiceRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
@Repository
public class CustomerServiceRepositoryImpl extends AbstractRepositoryImpl implements CustomerServiceRepository {
    @Override
    public CustomerService persistCustomerService(CustomerService customerService) {
        if(customerService.getId() == null){
            customerService.setId(getNextSequence("customerService"));
        }
        mongoOperations.save(customerService);
        return customerService;
    }

    @Override
    public List<CustomerService> getCustomerService(boolean isFaq) {
        Query query = new Query(Criteria.where("isActive").is(true).and("isFaq").is(isFaq));
        return mongoOperations.find(query, CustomerService.class);
    }
}

package com.hiteak.repo;

import com.hiteak.domain.CustomerService;

import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
public interface CustomerServiceRepository {

    public CustomerService persistCustomerService(CustomerService customerService);

    public List<CustomerService> getCustomerService(boolean isFaq);
}

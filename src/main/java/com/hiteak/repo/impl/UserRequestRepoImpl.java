package com.hiteak.repo.impl;

import com.hiteak.domain.UserRequest;
import com.hiteak.repo.UserRequestRepo;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by phongpham on 10/27/14.
 */
@Repository
public class UserRequestRepoImpl extends AbstractRepositoryImpl implements UserRequestRepo{
    @Override
    public UserRequest persistUserRequest(UserRequest userRequest) {
        if(userRequest.getRequestId() == null){
            userRequest.setRequestId(getNextSequence("userRequest"));
        }
        mongoOperations.save(userRequest);
        return userRequest;
    }

    @Override
    public List<UserRequest> getUserRequest(String requestType, boolean pendingRequest, String from, String to) {
        Criteria criteria = null;
        if(requestType != null){
            criteria = Criteria.where("requestType").is(requestType);
        }
        if(pendingRequest){
            if(criteria != null){
                criteria.and("processedDate").exists(false);
            }else{
                criteria = Criteria.where("processedDate").exists(false);
            }
        }
        if(from != null){
            Criteria dateRangeCriteria = Criteria.where("createDate").gte(from);
            if(to != null){
                dateRangeCriteria.lte(to);
            }
            if(criteria != null){
                criteria.andOperator(dateRangeCriteria);
            }else{
                criteria = dateRangeCriteria;
            }
        }
        Query query = new Query(criteria);
        return mongoOperations.find(query, UserRequest.class);
    }
}

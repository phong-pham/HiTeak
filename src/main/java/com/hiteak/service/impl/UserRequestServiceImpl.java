package com.hiteak.service.impl;

import com.hiteak.domain.UserRequest;
import com.hiteak.repo.UserRequestRepo;
import com.hiteak.service.UserRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by phongpham on 10/27/14.
 */
@Service
public class UserRequestServiceImpl implements UserRequestService{

    @Autowired
    private UserRequestRepo userRequestRepo;

    @Override
    public UserRequest persistUserRequest(UserRequest userRequest) {
        return userRequestRepo.persistUserRequest(userRequest);
    }

    @Override
    public List<UserRequest> getUserRequest(String requestType, boolean pendingRequest, String from, String to) {
        return userRequestRepo.getUserRequest(requestType, pendingRequest, from, to);
    }
}

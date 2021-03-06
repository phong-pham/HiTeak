package com.hiteak.service;

import com.hiteak.domain.UserRequest;

import java.util.Date;
import java.util.List;

/**
 * Created by phongpham on 10/27/14.
 */
public interface UserRequestService {
    public UserRequest persistUserRequest(UserRequest userRequest);
    public List<UserRequest> getUserRequest(String requestType, boolean pendingRequest, String from, String to);
}

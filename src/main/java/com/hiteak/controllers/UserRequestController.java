package com.hiteak.controllers;

import com.hiteak.domain.UserRequest;
import com.hiteak.service.UserRequestService;
import com.hiteak.util.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Date;

/**
 * Created by phongpham on 10/26/14.
 */
@Controller
public class UserRequestController extends AbstractController{

    @Autowired
    private UserRequestService userRequestService;

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "request-catalog", method = RequestMethod.POST)
    public void doRequestCatalog(ModelMap modelMap, @RequestBody String json){

        logger.debug("json: {}", json);
        UserRequest request = (UserRequest)convertJson(json, UserRequest.class);
        request.setCreateDateTime(DateTimeUtils.getDateAsString(new Date(), DateTimeUtils.DATE_TIME_FORMAT));
        request.setRequestType("CATALOG");

        userRequestService.persistUserRequest(request);
    }
}

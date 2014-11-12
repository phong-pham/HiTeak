package com.hiteak.controllers;

import com.hiteak.domain.ResponseWrapper;
import com.hiteak.domain.login.Login;
import com.hiteak.domain.login.User;
import com.hiteak.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by phongpham on 10/27/14.
 */
@Controller
public class SecurityController extends AbstractController{

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "do-login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseWrapper doLogin(ModelMap modelMap,
                            @RequestBody String json,
                            HttpServletResponse response){
        Map<String, Object> map = (Map)convertJson(json, HashMap.class);
        ResponseWrapper result = new ResponseWrapper();
        try{
            String userName = (String)map.get("userName");
            String password = (String)map.get("password");
            User user = userService.doLogin(userName, password);
            if(user != null){
                result.setSuccess(true);
                User tmp = new User();
                tmp.setFirstName(user.getFirstName());
                tmp.setLastName(user.getLastName());
                result.setData(user);

                BigDecimal id = userService.encryptNumber(new BigDecimal(user.getUserId()));
                Cookie userCookie = new Cookie("USER_ID", id.toString());
                userCookie.setPath("/");
                userCookie.setMaxAge(60*60);    //1 HOUR
                response.addCookie(userCookie);
            }
        }catch (Exception ex){
            result.setSuccess(false);
            result.setMessage(ex.getMessage());
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "request-password", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseWrapper doRequestPassword(@RequestParam String userName){
        ResponseWrapper result = new ResponseWrapper();
        try{
            Login login = userService.requestPassword(userName);
            if(login != null){
                result.setSuccess(true);
            }
        }catch (Exception ex){
            result.setMessage(ex.getMessage());
            result.setSuccess(false);
        }

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "request-sign-up", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseWrapper doRequestSignUp(@RequestBody String json){
        ResponseWrapper result = new ResponseWrapper();
        logger.debug("json: {}", json);
        User user = (User)convertJson(json, User.class);
        try{
            userService.doPersistUser(user);
            result.setSuccess(true);
        }catch (Exception ex){
            result.setSuccess(false);
            result.setMessage(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "do-logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public void doLogout(HttpServletRequest request, HttpServletResponse response){
         Cookie userCookie = getCookie(request, "USER_ID");
        if(userCookie != null){
            userCookie.setValue(null);
            userCookie.setPath("/");
            userCookie.setMaxAge(0);
            response.addCookie(userCookie);
        }
    }
}

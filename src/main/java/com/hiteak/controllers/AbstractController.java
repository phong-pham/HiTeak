package com.hiteak.controllers;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by phongpham on 10/27/14.
 */
public class AbstractController {

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    public Object convertJson(String json, Class clazz) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            return mapper.readValue(json, clazz);

        } catch (Exception e) {
            logger.error("JsonConversionException " + e.getMessage());
            e.printStackTrace();

            throw new RuntimeException("Unable to convert Json [" + json + "] to Class [" + clazz.getName() + "]<br/> Msg: " + e.getMessage()+ "!");
        }
    }

    public static Cookie getCookie(HttpServletRequest request, String cookieName){
        Cookie[] cookies = request.getCookies();
        Cookie result = null;
        for(int i=0; i<cookies.length; i++){
            Cookie cookie = cookies[i];
            if(cookie.getName().equals(cookieName)){
                result = cookie;
                break;
            }
        }
        return result;
    }
}

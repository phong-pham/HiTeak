package com.hiteak.service;

import com.hiteak.domain.login.Login;
import com.hiteak.domain.login.User;

import java.math.BigDecimal;

/**
 * Created by phongpham on 10/26/14.
 */
public interface UserService {

    public User doPersistUser(User user);
    public User doLogin(String userName, String password);
    public User getUserById(Long userId);
    public Login requestPassword(String userName);

    public BigDecimal encryptNumber(BigDecimal number);
    public BigDecimal decryptNumber(BigDecimal number);
}

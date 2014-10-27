package com.hiteak.repo;

import com.hiteak.domain.login.Login;
import com.hiteak.domain.login.User;

/**
 * Created by phongpham on 10/26/14.
 */
public interface UserRepo {

    public Login persistLogin(Login login);
    public Login getLoginByUserName(String userName);
    public User getUserByLogin(Long loginId);
    public User getUserById(Long userId);

    public User persistUser(User user);
}

package com.hiteak.repo.impl;

import com.hiteak.domain.login.Login;
import com.hiteak.domain.login.User;
import com.hiteak.repo.UserRepo;
import com.hiteak.util.DateTimeUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by phongpham on 10/26/14.
 */
@Repository
public class UserRepoImpl extends AbstractRepositoryImpl implements UserRepo {
    @Override
    public Login persistLogin(Login login) {
        if(login.getLoginId() == null){
            Long loginId = getNextSequence("login");
            login.setLoginId(loginId);
        }else{
            login.setUpdateDateTime(DateTimeUtils.getDateAsString(new Date(), DateTimeUtils.DATE_TIME_FORMAT));
        }
        mongoOperations.save(login);
        return login;
    }

    @Override
    public Login getLoginByUserName(String userName) {
        List<Login> loginList = mongoOperations.find(new Query(Criteria.where("userName").is(userName).and("active").is(true)), Login.class);
        if(loginList.size() > 0){
            return loginList.get(0);
        }else{
            return null;
        }
    }

    @Override
    public User getUserByLogin(Long loginId) {
        Query query = new Query(Criteria.where("loginId").is(loginId));
        List<User> users = mongoOperations.find(query, User.class);
        if(users.size() == 1){
            return users.get(0);
        }else{
            return null;
        }
    }

    @Override
    public User getUserById(Long userId) {
        List<User> users = mongoOperations.find(new Query(Criteria.where("userId").is(userId)), User.class);
        if(users.size() == 1){
            return users.get(0);
        }else{
            return null;
        }
    }

    @Override
    public User persistUser(User user) {
        if(user.getUserId() == null){
            user.setUserId(getNextSequence("user"));
        }else{
            user.setUpdateDateTime(DateTimeUtils.getDateAsString(new Date(), DateTimeUtils.DATE_TIME_FORMAT));
        }

        mongoOperations.save(user);
        return user;
    }
}

package com.hiteak.service.impl;

import com.hiteak.domain.login.Login;
import com.hiteak.domain.login.User;
import com.hiteak.repo.UserRepo;
import com.hiteak.service.UserService;
import org.jasypt.digest.StandardStringDigester;
import org.jasypt.util.numeric.StrongDecimalNumberEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Created by phongpham on 10/26/14.
 */
@Service
public class UserServiceImpl implements UserService{

    private final static StandardStringDigester digester = new StandardStringDigester();
    private final static StrongDecimalNumberEncryptor decimalEncryptor = new StrongDecimalNumberEncryptor();
    private final static String myEncryptionPassword = "H3ll0W0r1d";

    static {
        digester.setAlgorithm("SHA-1");   // optionally set the algorithm
        digester.setIterations(50000);  // increase security by performing 50000 hashing iterations

        decimalEncryptor.setPassword(myEncryptionPassword);
    }

    @Autowired
    private UserRepo userRepo;


    @Override
    public User doPersistUser(User user) {
        Login login = userRepo.getLoginByUserName(user.getLogin().getUserName());
        if(login == null){
            login = user.getLogin();
            login.setPassword(digester.digest(login.getPassword()));
            login = userRepo.persistLogin(login);
            user.setLoginId(login.getLoginId());
            user = userRepo.persistUser(user);
            login.setUserId(user.getUserId());
            userRepo.persistLogin(login);
            return user;
        }else{
            throw new RuntimeException("Username is taken.");
        }
    }

    @Override
    public User doLogin(String userName, String password) {
        Login login = userRepo.getLoginByUserName(userName);
        boolean match = false;
        if(login != null){
            match = digester.matches(password, login.getPassword());
            if(!match){
                throw new RuntimeException("Invalid password");
            }
            User user = userRepo.getUserByLogin(login.getLoginId());
            if(user != null){
                return user;
            }else{
                throw new RuntimeException("User not found for userName[" + userName + "]");
            }
        }else{
            throw new RuntimeException("Invalid username");
        }
    }

    @Override
    public User getUserById(Long userId) {
        return userRepo.getUserById(userId);
    }

    @Override
    public BigDecimal encryptNumber(BigDecimal number) {
        return decimalEncryptor.encrypt(number);
    }

    @Override
    public BigDecimal decryptNumber(BigDecimal number) {
        return decimalEncryptor.decrypt(number);
    }
}

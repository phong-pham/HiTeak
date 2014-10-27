import com.hiteak.domain.login.Login;
import com.hiteak.domain.login.User;
import com.hiteak.domain.login.UserRole;
import com.hiteak.service.UserService;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import java.util.ArrayList;

/**
 * Created by phongpham on 10/26/14.
 */
public class UserTest extends AbstractTest{

    private final static Logger LOG = LoggerFactory.getLogger(UserTest.class);

    @Autowired
    private UserService userService;

    @Test
    public void testSaveUser(){
        User user = new User();
        user.setFirstName("Phong");
        user.setLastName("Pham");
        user.setEmail("phongp84@gmail.com");
        user.setUserRoles(new ArrayList<UserRole>());
        user.getUserRoles().add(UserRole.CAN_EDIT_CATEGORY);
        user.getUserRoles().add(UserRole.CAN_EDIT_PRODUCT);
        Login login = new Login();
        login.setUserName("helloWorld2");
        login.setPassword("password");
        user.setLogin(login);
        user = userService.doPersistUser(user);
        LOG.debug("{}", user.getUserId());
    }

    @Test
    public void testDoLogin(){
        try{System.out.println("do login for [helloWorld]-[password]: " + userService.doLogin("helloWorld", "password"));}catch(Exception ex){System.out.println(ex.getMessage());}
        try{System.out.println("do login for [helloWorld2]-[password]: " + userService.doLogin("helloWorld2", "password"));}catch(Exception ex){System.out.println(ex.getMessage());}
        try{System.out.println("do login for [helloworld]-[password]: " + userService.doLogin("helloworld", "password"));}catch(Exception ex){System.out.println(ex.getMessage());}
        try{System.out.println("do login for [helloWorld]-[passwordsss]: " + userService.doLogin("helloWorld", "passwordsss"));}catch(Exception ex){System.out.println(ex.getMessage());}
    }


}

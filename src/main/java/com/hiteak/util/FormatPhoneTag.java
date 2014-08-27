package com.hiteak.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.jsp.tagext.SimpleTagSupport;

/**
 * Created by IntelliJ IDEA.
 * User: ericjin
 * Date: 2/14/12
 * Time: 11:25 AM
 * To change this template use File | Settings | File Templates.
 */
public class FormatPhoneTag extends SimpleTagSupport {
    final Logger log = LoggerFactory.getLogger(this.getClass());

    private String phone;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void doTag() {
        try {
            StringBuilder strBuilder = new StringBuilder("");

            if (phone != null && phone.length() == 10) {
                strBuilder.append("(").append(phone.substring(0,3)).append(") ").append(phone.substring(3,6)).append("-").append(phone.substring(6));
            }
            getJspContext().getOut().write(strBuilder.toString());

        } catch(Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
        }
    }

}

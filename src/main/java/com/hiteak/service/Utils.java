package com.hiteak.service;

import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * Created by phongpham on 11/9/14.
 */
public class Utils {

    public static JavaMailSenderImpl mailSender  = new JavaMailSenderImpl();

    private final static String userName = "phongp84web@gmail.com";
    private final static String password = "helloWorld84";

    public static boolean sendEmail(String body, String subject, String toMail, boolean sendAsHtml){
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(userName, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(userName));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(toMail));
            message.setSubject(subject);
            message.setText(body);
            Transport.send(message);

            System.out.println("Done");
            return true;

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}

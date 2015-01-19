package com.hiteak.service.impl;

import com.hiteak.service.CommunicationService;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by phongpham on 12/16/14.
 */
@Service
public class CommunicationServiceImpl implements CommunicationService {

//    private static TwilioRestClient client = new TwilioRestClient("AC2f5ad61f750762338f5adef29a57c0ca", "b5e49fc4d664adf77a482fe1ce4d8a72");

    //BELOW IS SBI ACCOUNT
    private static TwilioRestClient client = new TwilioRestClient("ACbcea3b19b31705bc51ef1898a1c90aab", "da262f643a732e02e0e4031469f2d905");

    /** Send an Sms message. **/
    public String sendOutboundSmsMessage(String to, String message) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("Body", message));
        params.add(new BasicNameValuePair("To", to));
//        params.add(new BasicNameValuePair("From", "+9493976446"));
        params.add(new BasicNameValuePair("From", "+17143520016"));

        try {
            // send the text message.
            return client.getAccount().getMessageFactory().create(params).getSid();

        } catch (TwilioRestException e) {
            e.printStackTrace();
            return null;
        }
    }
}

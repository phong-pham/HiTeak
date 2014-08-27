package com.hiteak.util;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: kevintran
 * Date: 11/29/12
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */
public class VelocityUtils {

    public static VelocityEngine velocityEngine = new VelocityEngine();

    public static final Logger logger = LoggerFactory.getLogger(VelocityUtils.class);

    static {
        Properties p = new Properties();
        //p.setProperty("file.resource.loader.path", "/opt/Liberty/resources");
        p.put("resource.loader", "class");
        p.put("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");

        try{
            velocityEngine.init(p);
            logger.debug("Velocity has loaded using a classpath resource loader for templates.");

            /*logger.debug("Velocity has been initialized and is using resources found in " + p.getProperty("file.resource.loader.path"));
            if (new File(p.getProperty("file.resource.loader.path")).exists()) {
                logger.info("Templates found ...");
                File temps[] = new File(p.getProperty("file.resource.loader.path")).listFiles();
                for (File t : temps) {
                    logger.info(t.getAbsolutePath());
                }
            }*/
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    public static String convert(Map model, String template) {
        String body = "Something went wrong!";

        template = "velocity/" + template;
        logger.debug("Velocity will using template [" + template + "]");

        try {
            VelocityContext context = new VelocityContext();
            for (Object key : model.keySet()) {
                Object value = model.get(key);
                context.put((String) key, value);
            }

            if (model != null && template != null) {
                StringWriter sw = new StringWriter();
                velocityEngine.mergeTemplate(template, "UTF-8", context, sw);
                body = sw.toString();
            }

        } catch (Exception x) {
            x.printStackTrace();
            throw new RuntimeException(x);
        }

        return body;
    }

    public static String phoneFormatter(String phoneNumber) {
        String result = "";
        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            phoneNumber = phoneNumber.replace("(", "");
            phoneNumber = phoneNumber.replace(")", "");
            phoneNumber = phoneNumber.replace(" ", "");
            phoneNumber = phoneNumber.replace("-", "");

            if (phoneNumber.length() == 10) {
                result = "(" + phoneNumber.substring(0, 3) + ") " + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, 10);
            } else if (phoneNumber.length() >= 7) {
                result = "(" + phoneNumber.substring(0, 3) + ") " + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, phoneNumber.length());
            } else if (phoneNumber.length() >= 4) {
                result = "(" + phoneNumber.substring(0, 3) + ") " + phoneNumber.substring(3, phoneNumber.length());
            }
        }
        return result;
    }

    public static String getOrdinalValue(Integer number){
        String result = "";
        if(number != null){
            result = number.toString();
            char lastDigit = result.charAt(result.length() -1);
            boolean needToCheckForSpecialCase = (result.length() != 2 || result.charAt(0) != '1');
            if(lastDigit == '1' && needToCheckForSpecialCase){
                result += "st";
            }else if(lastDigit == '2' && needToCheckForSpecialCase){
                result += "nd";
            }else if(lastDigit == '3' && needToCheckForSpecialCase){
                result += "rd";
            }else{
                result += "th";
            }
        }
        return result;
    }

    public static String getDateAsString(Date dt, String format){
        String result = "";
        if(dt != null){
            if(format == null){
                format = "MM-dd-yyyy";
            }
            Format df = new SimpleDateFormat(format);
            result = df.format(dt);
        }
        return result;
    }

    public static Integer getTimeAsDigit(Date dt){
        Integer result = 0;
        if(dt != null){
            Calendar cal = Calendar.getInstance();
            cal.setTime(dt);
            result = Integer.valueOf(cal.get(Calendar.HOUR_OF_DAY) + "" + cal.get(Calendar.MINUTE));
        }
        return result;
    }

    public static Date parseDate(String dateStr, String format){
        Date result = null;
        if(dateStr != null && dateStr.trim().length() > 0){
            if(format == null){
                format = "MM-dd-yyyy";
            }
            SimpleDateFormat df = new SimpleDateFormat(format);
            try {
                result = df.parse(dateStr);
            } catch (ParseException e) {
                logger.debug("Fail to parse " + dateStr + " to Date with format " + format);
            }
        }
        return result;
    }

    public static String convertListMapToCSV(List<LinkedHashMap<String, String>> mapList){
        String filePath = "/opt/callcenter/" + UUID.randomUUID() + ".csv";
        try{
            FileWriter writer = new FileWriter(filePath);
            for(int i=0; i<mapList.size(); i++){
                Map<String, String> map = mapList.get(i);
                Set<String> keys = map.keySet();
                int count = 0;
                if(i==0){
                    for(String key : keys){
                        count++;
                        writer.write(key);
                        if(count == keys.size()){
                            writer.write("\r\n");
                        }else{
                            writer.write(",");
                        }
                    }
                }
                count = 0;
                for(String key : keys){
                    writer.write(map.get(key) != null ? map.get(key) : "");
                    count++;
                    if(count == keys.size()){
                        writer.write("\r\n");
                    }else{
                        writer.write(",");
                    }
                }
            }
            writer.close();
        }catch(IOException iox){
            iox.printStackTrace();
        }
        return filePath;
    }
}

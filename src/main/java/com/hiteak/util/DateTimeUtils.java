package com.hiteak.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by phongpham on 12/14/14.
 */
public class DateTimeUtils {

    private final static Logger logger = LoggerFactory.getLogger(DateTimeUtils.class);

    public final static String DATE_TIME_FORMAT = "MM-dd-yyyy HH:mm:ss";

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

    public static Date getLoadedTimeByLocationOffset(Integer locationOffset){
        Calendar cal = Calendar.getInstance();
        TimeZone timeZone = cal.getTimeZone();
        Integer currentOffset = timeZone.getRawOffset() / (1000 * 60 * 60);
        if(locationOffset != null){
            Integer offset = locationOffset - currentOffset;
            cal.add(Calendar.HOUR_OF_DAY, offset);
        }
        return cal.getTime();
    }

    public static Date getTimeByLocationOffset(Date date, Integer locationOffset){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        TimeZone timeZone = cal.getTimeZone();
        Integer currentOffset = timeZone.getRawOffset() / (1000 * 60 * 60);
        if(locationOffset != null){
            Integer offset = locationOffset - currentOffset;
            cal.add(Calendar.HOUR_OF_DAY, offset);
        }
        return cal.getTime();
    }
}

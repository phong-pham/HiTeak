package com.hiteak.util;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by phongpham on 12/14/14.
 */
public class DateTimeUtils {

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

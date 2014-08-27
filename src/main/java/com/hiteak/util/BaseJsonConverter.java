package com.hiteak.util;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Marlin Clark May 13, 2011
 *
 * Base JSON conversion class.  Provides Helper methods used to convert
 * JSON to varies objects, mainly JPA Entities.
 * 
 */
public class BaseJsonConverter {

    final static Logger logger = LoggerFactory.getLogger(BaseJsonConverter.class);

    /**
     * Convert JSON to a Map.
     *
     * @param   String json
     *
     * @return  Map<String, String>
     */
    public static Map<String, String> convertToMap(String json) {
        Map<String, String> map = null;
        try {
            map = new ObjectMapper().readValue(json, HashMap.class);
        } catch (IOException e) {
            logger.error("JsonMapConversionException " + e.getMessage());
            e.printStackTrace();

            throw new RuntimeException("Unable to convert Json [" + json + "] to a Map<String,String>!");
        }
        return map;
    }

    /**
     * Convert JSON to a Map.
     *
     * @param   String json
     *
     * @return  Map<String, Object>
     */
    public static Map<String, Object> convertToMapObject(String json) {
        Map<String, Object> map = null;
        try {
            map = new ObjectMapper().readValue(json, HashMap.class);
        } catch (IOException e) {
            logger.error("JsonMapConversionException " + e.getMessage());
            e.printStackTrace();

            throw new RuntimeException("Unable to convert Json [" + json + "] to a Map<String,String>!");
        }
        return map;
    }

    /**
     * Convert JSON to an Object using data as the root node name.
     *
     * @param   String json
     * @param   Class  clazz
     *
     * @return  JPA Object
     */
    public static Object convertNoPath(String json, Class clazz) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            return mapper.readValue(json, clazz);

        } catch (Exception e) {
            logger.error("JsonConversionException " + e.getMessage());
            e.printStackTrace();

            throw new RuntimeException("Unable to convert Json [" + json + "] to Class [" + clazz.getName() + "]<br/> Msg: " + e.getMessage()+ "!");
        }
    }

    /**
     * Convert JSON to an Object using data as the root node name.
     *
     * @param   String json
     * @param   Class  clazz
     *
     * @return  JPA Object
     */
    public static Object convert(String json, Class clazz) {
        return convert(json, clazz, new String[]{"data"});
    }

    /**
     * Convert JSON to an Object iterating through the node name array.
     *
     * @param   String      json data
     * @param   class       class name
     * @param   String[]    node names {"data", "patient"}
     * 
     * @return  JPA Object
     */
    public static Object convert(String json, Class clazz, String node[]) {
        logger.debug("Deserializing {}", json);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
        try {
            JsonNode rootNode = mapper.readValue(json, JsonNode.class);
            JsonNode dataNode = rootNode.path(node[0]);

            for (int x=1; x < node.length; x++) {
                logger.debug("Search for an object using path name: " + node[x]);
                dataNode = dataNode.path(node[x]);
            }

            /** Ensure you have a dataNode. **/
            if (dataNode == null) {
                throw new RuntimeException("Unable to find an object with the path provided!");
            }

            /** Ensure the remainder is an Object. **/
            if (dataNode.isObject()) {
                return mapper.readValue(dataNode.toString(), clazz);
            } else {
                logger.error(dataNode.toString());
                throw new RuntimeException("Data found was not an object suitable for conversion!");
            }
            
        } catch (Exception e) {
            logger.error("JsonDataConversionException " + e.getMessage());
            e.printStackTrace();

            throw new RuntimeException("Unable to convert Json [" + json + "] to Class [" + clazz.getName() + "]<br/> Msg: " + e.getMessage()+ "!");
        }
    }
}

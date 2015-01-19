import com.hiteak.service.CommunicationService;
import org.apache.commons.lang.math.RandomUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * Created by phongpham on 12/16/14.
 */
public class CommunicationServiceTest extends AbstractTest {

    @Autowired
    private CommunicationService communicationService;

    @Test
    public void testSendSMS(){
//        communicationService.sendOutboundSmsMessage("9493315916", "hello world");
//        communicationService.sendOutboundSmsMessage("9492326583", "Nga, you are secret santa for Anh Thanh ($20 is the budget, and no gift cards). Please text back to 9493315916 to confirm receiving this message.");
        communicationService.sendOutboundSmsMessage("6194307636", "Wally, you are secret santa for Phong ($20 is the budget, and no gift cards). Please text back to 9493315916 to confirm receiving this message.");
    }


    @Test
    public void randomPick(){
        Map<String,Object> phones = new HashMap<String, Object>();
//        phones.put("Phong", "9493315916");
        phones.put("Nga", "9492326583");
        phones.put("Son", "9493736514");
        phones.put("Thao", "7149335590");
        phones.put("Anh Thanh", "7147239377");
        phones.put("Chi Phuong", "7148014108");
        phones.put("Toan", "8587747355");
        phones.put("Thao Nguyen", "8587747366");
//        phones.put("Wally(To)", "6194307636");
        Map<String, Object> result = new HashMap<String, Object>();
        Random rand = new Random();
        boolean ok = true;
        int count = 0;
        do{
            count++;
            List<String> givers = new ArrayList<String>();
            List<String> takers = new ArrayList<String>();
            List<String> temp = new ArrayList<String>();
            temp.addAll(phones.keySet());

            while(temp.size() > 0){
                String key = "";
                if(temp.size() == 1){
                    key = temp.get(0);
                }else{
                    int keyPos = rand.nextInt(temp.size()-1) + 1;
                    key = temp.get(keyPos);
                }
                temp.remove(key);
                givers.add(key);
            }
            temp.addAll(phones.keySet());
            while(temp.size() > 0){
                String key = "";
                if(temp.size() == 1){
                    key = temp.get(0);
                }else{
                    int keyPos = rand.nextInt(temp.size()-1) + 1;
                    key = temp.get(keyPos);
                }
                temp.remove(key);
                takers.add(key);
            }
            System.out.println("givers: " + givers);
            System.out.println("takers: " + takers);

            for(String key : givers){
                if(takers.size() == 1){
//                    System.out.println(count + "/" + key + " - " + takers.get(0));
                    result.put(key, takers.get(0));
                    count++;
                }else{
                    String taker = null;
                    while(taker == null){
                        int pos = rand.nextInt(takers.size()-1) + 1;
                        if(!takers.get(pos).equalsIgnoreCase(key)){
                            taker = takers.get(pos);
                            takers.remove(taker);
//                            System.out.println(count + "/" + key + " - " + taker);
                            result.put(key, taker);
                            count++;
                        }
                    }
                }
            }
            for(String key : result.keySet()){
                if(key.equalsIgnoreCase(result.get(key).toString())){
                    ok = false;
                    result = new HashMap<String, Object>();
                    break;
                }
                ok = true;
            }
        }while(!ok && count <= 100);
        count = 1;
        if(result.size() == phones.size()){
            for(String key : result.keySet()){
                String message = key + ", you are secret santa for " + result.get(key) + " ($20 is the budget, and no gift cards).";
                message += " Please text back to 9493315916 to confirm receiving this message.";
                System.out.println(count + "/About to send \"" + message + "\" to " + phones.get(key));
                count++;
                communicationService.sendOutboundSmsMessage(phones.get(key).toString(), message);
            }
        }
    }
}

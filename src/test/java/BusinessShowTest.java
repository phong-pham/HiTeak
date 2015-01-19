import com.hiteak.domain.BusinessShow;
import com.hiteak.repo.BusinessShowRepo;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by phongpham on 1/18/15.
 */
public class BusinessShowTest extends AbstractTest {

    private final static Logger LOG = LoggerFactory.getLogger(BusinessShowTest.class);

    @Autowired
    private BusinessShowRepo businessShowRepo;

    @Test
    public void testLoadBusinessShow(){
        BusinessShow bs = new BusinessShow();
        bs.setShowLogo("furniture/images/casual-market-show.jpg");
        bs.setEffectiveDateTime("2012-02-01 00:00:00");
        businessShowRepo.persistBusinessShow(bs);
    }

    @Test
    public void testGetActiveBusinessShow(){
        List<BusinessShow> result = businessShowRepo.getActiveBusinessShows();
        System.out.println(result.size());
        for(BusinessShow bs : result){
            System.out.println(bs);
        }
    }
}

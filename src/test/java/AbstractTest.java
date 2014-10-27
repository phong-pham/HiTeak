import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

/**
 * Created by phongpham on 10/26/14.
 */
@ContextConfiguration(locations = {"classpath:spring-mongo.xml",
                                    "classpath:spring-services.xml"})
public class AbstractTest extends AbstractJUnit4SpringContextTests {
}

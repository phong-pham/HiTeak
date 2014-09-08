import com.hiteak.domain.Category;
import com.hiteak.domain.CustomerService;
import com.hiteak.domain.Product;
import com.hiteak.repo.CategoryRepository;
import com.hiteak.repo.CustomerServiceRepository;
import com.hiteak.repo.ProductRepository;
import com.hiteak.service.CategoryService;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by phongpham on 9/7/14.
 */
@ContextConfiguration(locations = {"classpath:spring-mongo.xml",
                                    "classpath:spring-services.xml"})
public class DataTest extends AbstractJUnit4SpringContextTests {

    private final static Logger LOG = LoggerFactory.getLogger(DataTest.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerServiceRepository customerServiceRepository;

    @Autowired
    private CategoryService categoryService;

    private static final List<Category> categories = new ArrayList<Category>();

    @Test
    public void populateData(){
        List<Category> outdoorCategories = new ArrayList<Category>();

        Category outdoorCategory = new Category(null, "Outdoor Products", outdoorCategories, -1);
        outdoorCategory.setCategoryDescription("HL Distribution, Inc. produces tables, chairs, sunloungers, trolleys... for garden, swimming pool, bathroom, tourist boat with teak wood. This kind of wood contains high natural teak oil; protect the furniture from wood-worm eating and severe weather conditions. We also combine teak wood with other material such as stainless steel, aluminum, iron, textilene... to diversify our products.");
        categories.add(outdoorCategory);
        outdoorCategory = categoryRepository.persistCategory(outdoorCategory);

        Category outdoorChair = categoryRepository.persistCategory(new Category(null, "Chairs", "furniture/images/cat_1.jpg", outdoorCategory.getCategoryId()));


        Category reclining = categoryRepository.persistCategory(new Category(null, "Reclining", "furniture/images/outdoor/chair/out_rec_1.jpg", outdoorChair.getCategoryId()));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC275", "", "furniture/images/outdoor/chairs/out_rec_1.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC669", "", "furniture/images/outdoor/chairs/out_rec_2.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC173", "", "furniture/images/outdoor/chairs/out_rec_3.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC248", "", "furniture/images/outdoor/chairs/out_rec_4.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC298", "", "furniture/images/outdoor/chairs/out_rec_5.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC363", "", "furniture/images/outdoor/chairs/out_rec_6.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "5 Position Chair", "HLAC388", "", "furniture/images/outdoor/chairs/out_rec_7.jpg", 100d, 50d));
        reclining.getProducts().add(new Product(null, "Westimster 5 Position Chair", "HLAC393", "", "furniture/images/outdoor/chairs/out_rec_8.jpg", 100d, 50d));
        for(Product product : reclining.getProducts()){
            product.setCategoryId(reclining.getCategoryId());
            productRepository.persistProduct(product);
        }
//        outdoorChair.getSubCategories().add(reclining);
        categories.add(reclining);

        Category folding = categoryRepository.persistCategory(new Category(null, "Folding", "furniture/images/outdoor/chair/out_folding_1.jpg", outdoorChair.getCategoryId()));
//        outdoorChair.getSubCategories().add(folding);
        categories.add(folding);

        Category stacking = categoryRepository.persistCategory(new Category(null, "Stacking", "furniture/images/outdoor/chair/out_stacking_1.jpg", outdoorChair.getCategoryId()));
//        outdoorChair.getSubCategories().add(stacking);
        categories.add(stacking);

        Category oneSeater = categoryRepository.persistCategory(new Category(null, "One Seater", "furniture/images/outdoor/chair/out_oseater_1.jpg", outdoorChair.getCategoryId()));
//        outdoorChair.getSubCategories().add(oneSeater);
        categories.add(oneSeater);
        outdoorCategories.add(outdoorChair);
        categories.add(outdoorChair);

        Category outdoorBench = categoryRepository.persistCategory(new Category(null, "Benches", "furniture/images/cat_2.jpg", outdoorCategory.getCategoryId()));
        outdoorCategories.add(outdoorBench);
        categories.add(outdoorBench);

        Category outdoorTable = categoryRepository.persistCategory(new Category(null, "Tables", "furniture/images/cat_3.jpg", outdoorCategory.getCategoryId()));
        outdoorCategories.add(outdoorTable);
        categories.add(outdoorTable);

        Category outdoorLounger = categoryRepository.persistCategory(new Category(null, "Loungers", "furniture/images/cat_4.jpg", outdoorCategory.getCategoryId()));
        outdoorCategories.add(outdoorLounger);
        categories.add(outdoorLounger);

        Category outdoorSet = categoryRepository.persistCategory(new Category(null, "Sets", "furniture/images/cat_5.jpg", outdoorCategory.getCategoryId()));
        outdoorCategories.add(outdoorSet);
        categories.add(outdoorSet);



        List<Category> indoorCategories = new ArrayList<Category>();

        Category indoorChair = new Category(7, "Chairs", "furniture/images/cat_6.jpg", 6);
        indoorCategories.add(indoorChair);
        categories.add(indoorChair);

        Category indoorTable = new Category(8, "Tables", "furniture/images/cat_7.jpg", 6);
        indoorCategories.add(indoorTable);
        categories.add(indoorTable);

        Category indoorBedroom = new Category(9, "Bedroom Sets", "furniture/images/cat_8.jpg", 6);
        indoorCategories.add(indoorBedroom);
        categories.add(indoorBedroom);

        Category indoorDining = new Category(10, "Dining Sets", "furniture/images/cat_9.jpg", 6);
        indoorCategories.add(indoorDining);
        categories.add(indoorDining);

        Category indoorCategory = new Category(6, "Indoor Products", indoorCategories, 6);
        indoorCategory.setCategoryDescription("We produce indoor furniture for bedroom, dining room, bathroom, kitchen cabinet, door,... with beech wood imported from Europe. This kind of wood has bright color and stable for using. Our designers create many different ranges of products: classic, modern or combine both to meet all demands of customers.");
        categories.add(indoorCategory);
    }

    @Test
    public void testGetCategories(){
        List<Category> categoryList = categoryService.getCategoriesById(-1, false, false, true);
        System.out.println(categoryList.get(0));
        categoryList = categoryService.getCategoriesById(-1, true, true, true);
        for(Category category : categoryList){
            System.out.println(category);
        }
    }

    @Test
    public void populateCustomerService(){
        CustomerService cs1 = new CustomerService("How to Order", "", 0, false);
        cs1.setContent("We take you step-by-step to make purchasing easy for you. You can order through our website, phone, or email. We response the fastest with website and email order.");
        customerServiceRepository.persistCustomerService(cs1);

        CustomerService cs2 = new CustomerService("Shipping & Returns", "", 1, false);
        String content = "It will take 1-2 business days to process your order. It depends on where you are, it could take up to 7 business days to ship to your destination. For customized orders, it should take up to 4 - 5 weeks.";
        content += "<br/><br/>You will receive a delivery confirmation once we ship your order. For returns, please email us before sending the items back.";
        cs2.setContent(content);
        customerServiceRepository.persistCustomerService(cs2);

        CustomerService cs3 = new CustomerService("Guaranteed", "", 2, false);
        content = "HiTeak provides warranty to the original customer, ensuring that the material and craftsmanship of our furniture are free of defects. However, in the case of a defect in material or craftsmanship, HiTeak will repair and/or replace the defective components.";
        content += "<br/><br/>All warranties are not transferable and are limited to the original customer with proof of purchase. HiTeak shall not be liable, in any event for improper handling or normal wear and tear damages resulting from the use of the product. Please see exclusions below.";
        cs3.setContent(content);
        customerServiceRepository.persistCustomerService(cs3);

        CustomerService cs4 = new CustomerService("Limited warranty of Products", "", 3, false);
        content = "<ul>";
        content += "<li>Teak - 5 years</li>";
        content += "<li>Stainless Steel - 1 years </li>";
        content += "<li>Brass - 1 years</li>";
        content += "<li>Textilene - 1 years</li>";
        content += "<li>Cushions/Parasol – 1 Year Manufacturer's Warranty on Stitching</li>";
        content += "<li>Umbrellas – 1 Year Manufacturer's Warranty</li>";
        content += "</ul>";
        cs4.setContent(content);
        customerServiceRepository.persistCustomerService(cs4);

        CustomerService cs5 = new CustomerService("Exclusion", "", 4, false);
        content = "Teak wood requires proper maintenance and cleaning on occasion, depending on the environment the furniture is exposed. ";
        content += "It is highly recommended to clean the furniture at least two times a year to remove the build-up of dirt from the environment. HiTeak may discontinue materials, parts or color on outdated items.";
        cs5.setContent(content);
        customerServiceRepository.persistCustomerService(cs5);

        CustomerService cs6 = new CustomerService("Concealed Damage", "", 5, false);
        content = "HiTeak highly recommends that customers unpack all packages within Two days of delivery of your order. Contact us immediately of any damage to the product. ";
        content += "In the case of a return please save all cartons and packing materials so that they can be used for shipping. Send photos of the damage product and packages for claims if applicable.";
        cs6.setContent(content);
        customerServiceRepository.persistCustomerService(cs6);

        CustomerService faq1 = new CustomerService("What makes HL Distribution Inc different from other furniture distributors?", "", 0, true);
        content = "Our furniture comes straight from the manufacturer to ensure you the best competitive edge on the market." ;
        content += "<br/><br/>Our Teak furniture is made from 100% Solid Teak Wood which was made from \"kiln dried\" lumber. Our \"kiln dried\" lumber is from 100% genuine plantation teak forests that are well managed, credibly certified from Brazil, Costa Rica, South America and Burma. We choose the timber that has older age (above 30 years old) to ensure the wood is more durable and give the beautiful yellow color. ";
        content += "We also carefully select the wood well to get the uniform color for each of the furniture. With more than 20 years of experience in manufacturing teak wood, we know how to make the furniture has the smooth, the most finely sanded finish in the market. For a closer look, please come and enjoy yourselves in our showrooms to feel how high end teak can make a difference to your life. ";
        content += "<br/><br/>We also work with you one by one to ensure you get what you need. We believe that customer satisfaction is our priority. Therefore, we ensure customers to feel above satisfied with your orders.";
        faq1.setContent(content);
        customerServiceRepository.persistCustomerService(faq1);

        CustomerService faq2 = new CustomerService("I am concerned about deforestation.", "", 1, true);
        content = "With over 20 years of exporting Teak Furniture to Europe, one of the conservative market about deforestation, our manufacture only sources the Teak wood from well managed, credibly certified Teak forests from Brazil, Costa Rica, South America and Burma.";
        content += "<br/><br/>Our factory, Hiep Long Fine Furniture Co, is one of the first manufactures has the FSC chain of custody (CoC). According to Forest Stewardship Council, \"FSC chain of custody (CoC) tracks FSC certified material through the production process - from the forest to the consumer, including all successive stages of processing, transformation, manufacturing and distribution.\" ";
        content += "Therefore, we are proud to say that our teak wood is from genuine plantation teak forests.";
        faq2.setContent(content);
        customerServiceRepository.persistCustomerService(faq2);

        CustomerService faq3 = new CustomerService("How do I care for my teak furniture?", "", 2, true);
        content = "<ul>";
        content += "<li>Teak furniture is very easy to maintain. It takes little to no effort in caring for this wood. The wood has the natural beauty of long-lasting life.</li>";
        content += "<li>Our teak furniture do not need to be covered or stored every time it rains or snows.</li>";
        content += "<li>If left outdoors untreated, they will turn in to silvery grey which some people like it.</li>";
        content += "<li>To maintain the original color, applications of teak protector or sealer are needed. </li>";
        content += "<li>If you need detail information on maintenance, please contact us, our team will guide you in detail.</li>";
        content += "</ul>";
        faq3.setContent(content);
        customerServiceRepository.persistCustomerService(faq3);

        CustomerService faq4 = new CustomerService("Is the teak oiled or have a finish on it?", "", 3, true);
        content = "The teak furniture comes from the factory kiln dried and ready for assembly. The oil inside the wood itself can be enough to protect and polish the furniture. Therefore, we leave the furniture untreated otherwise stated since a lot of customers like it that way. ";
        content += "<br/><br/>Using teak oils will darken the complexion of the wood giving it a dark rich luster that some people like when used both indoors and outdoors.";
        content += "<br/><br/>Without teak oil or teak protector, the teak furniture will turn into silvery grey after a year left outdoor. However, customers can choose to have teak oil or not.";
        content += "<br/><br/>We do want to mention that we does not recommend oiling your furniture! Oiling your teak furniture creates a maintenance schedule and also allows mildew and mold to grow very, very quickly on your furniture. ";
        content += "In additions, teak oil will become splotchy after being exposed to the rain. For more details about teak care, please contact us, our team will guide you in detail.";
        faq4.setContent(content);
        customerServiceRepository.persistCustomerService(faq4);

    }
}

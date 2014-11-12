package com.hiteak.repo.impl;

import com.hiteak.domain.Image;
import com.hiteak.repo.ImageRepository;
import com.hiteak.util.DateTimeUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by phongpham on 11/9/14.
 */
@Repository
public class ImageRepositoryImpl extends AbstractRepositoryImpl implements ImageRepository {
    @Override
    public Image persistImage(Image image) {
        if(image.getImageId() == null){
            image.setImageId(getNextSequence("image"));
        }else{
            image.setUpdateDateTime(DateTimeUtils.getDateAsString(new Date(), DateTimeUtils.DATE_TIME_FORMAT));
        }
        mongoOperations.save(image);
        return image;
    }

    @Override
    public List<Image> getImagesByType(String imageType) {
        List<Image> images = mongoOperations.find(new Query(Criteria.where("active").is(true).and("imageType").is(imageType)), Image.class);
        return images;
    }
}

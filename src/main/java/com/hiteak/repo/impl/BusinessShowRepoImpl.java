package com.hiteak.repo.impl;

import com.hiteak.domain.BusinessShow;
import com.hiteak.repo.BusinessShowRepo;
import com.hiteak.util.DateTimeUtils;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by phongpham on 12/14/14.
 */
@Repository
public class BusinessShowRepoImpl extends AbstractRepositoryImpl implements BusinessShowRepo {
    @Override
    public List<BusinessShow> getActiveBusinessShows() {
        String current = DateTimeUtils.getDateAsString(new Date(), "yyyy-MM-dd HH:mm:ss");
        Criteria criteria = Criteria.where("effectiveDateTime").lte(current);
        List<Criteria> orCriteria = new ArrayList<Criteria>();
        orCriteria.add(Criteria.where("expireDateTime").is(null));
        orCriteria.add(Criteria.where("expireDateTime").gte(current));
        criteria.orOperator(orCriteria.toArray(new Criteria[orCriteria.size()]));

        Query query = new Query(criteria);
        query.with(new Sort(Sort.Direction.ASC, new String[]{"effectiveDateTime"}));
        return mongoOperations.find(query, BusinessShow.class);
    }

    @Override
    public BusinessShow persistBusinessShow(BusinessShow businessShow) {
        businessShow.setShowId(getNextSequence("businessShow"));
        mongoOperations.save(businessShow);
        return businessShow;
    }
}

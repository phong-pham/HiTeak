package com.hiteak.repo.impl;

import com.hiteak.domain.SequenceId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

/**
 * Created by phongpham on 9/7/14.
 */
public class AbstractRepositoryImpl {

    @Autowired
    MongoOperations mongoOperations;

    public Long getNextSequence(String sequenceName){
        Query query = new Query(Criteria.where("sequenceName").is(sequenceName));

        Update update = new Update();
        update.inc("sequenceValue", 1);

        FindAndModifyOptions options = new FindAndModifyOptions();
        options.returnNew(true);
        options.upsert(true);

        SequenceId seqId = mongoOperations.findAndModify(query, update, options, SequenceId.class);

        return seqId.getSequenceValue();

    }
}

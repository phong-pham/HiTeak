package com.hiteak.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by phongpham on 9/7/14.
 */
@Document(collection = "sequence")
public class SequenceId {

    @Id
    private String sequenceName;
    private Long sequenceValue;

    public String getSequenceName() {
        return sequenceName;
    }

    public void setSequenceName(String sequenceName) {
        this.sequenceName = sequenceName;
    }

    public Long getSequenceValue() {
        return sequenceValue;
    }

    public void setSequenceValue(Long sequenceValue) {
        this.sequenceValue = sequenceValue;
    }
}

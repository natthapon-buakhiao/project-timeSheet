package com.project.time.sheet.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
@Entity
@Table (name = "USER_PROJECT")
public class UserProject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @EmbeddedId
    private UserProjectPk id;
    
    @Column(name = "TASK")
    private String task;

    @Column(name = "DATE")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
}
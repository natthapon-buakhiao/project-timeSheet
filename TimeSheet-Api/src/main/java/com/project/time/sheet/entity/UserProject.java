package com.project.time.sheet.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import lombok.Data;

// @EnableAutoConfiguration
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
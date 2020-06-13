package com.project.time.sheet.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;


import lombok.Data;

@Data
@Entity
@Table (name = "PROJECT")
public class Project {
    @Id
	@Column(name="PROJECT_CODE")
    private String projectCode;


    @Column(name = "PROJECT_NAME")
    private String projectName;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "USER_CODE_SUPERVISOR")
    private String userCodeSupervisor;



    @Column(name = "DATE")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;



    



}
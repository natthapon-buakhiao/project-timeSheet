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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table (name = "REPORT")
public class Report {

    @Id
	@Column(name="REPORT_ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
	@JoinColumn(name = "USER_CODE")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    
    @Column(name = "DATE_IN")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateIn;

    @Column(name = "DATE_OUT")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateOut;

    @Column(name = "TOTAL_HOURS")
    private int totalHours;

    @Column(name = "TASK")
    private String task;

    @Column(name = "FEEDBACK")
    private String feedBack;

    @Column(name = "FEEDBACK")
    private String goals;
    
}
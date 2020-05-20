package com.project.time.sheet.entity;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;


@Data
@Entity
@Table (name = "ATTENDANCE")
public class Attendance {
    @Id
	@Column(name="ATTENDANCE_ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_Code")
    private String userCode;
    
    @Column(name = "DATE")
    @JsonFormat(pattern="yyyy-MM-dd)
    private Date date;

    @Column(name = "TIME_IN")
    private String timeIn;

    @Column(name = "TIME_OUT")
    private String timeOut;

    @Column(name = "TASK")
    private String task;

    @Column(name = "PROJECT")
    private String project;

    @Column(name = "SITE")
    private String site;




}
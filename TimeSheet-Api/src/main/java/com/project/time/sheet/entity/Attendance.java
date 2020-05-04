package com.project.time.sheet.entity;

import java.time.LocalTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    @Column(name = "USER_ID")
    private String userId;
    
    @Column(name = "DATE")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Bangkok")
    private Date date;

    @Column(name = "TIME_IN")
    private LocalTime timeIn;

    @Column(name = "TIME_OUT")
    private LocalTime timeOut;

    @Column(name = "TASK")
    private String task;

    @OneToOne(mappedBy = "attendance")
    private Profile profile;



}
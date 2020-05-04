package com.project.time.sheet.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Entity
@Table (name = "PROFILE")
public class Profile {    
    @Id
	@Column(name="PROFILE_ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "BIRTHDAY")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Bangkok")
    private Date birthday;

    @Column(name = "AGE")
    private int age;

    @Column(name = "ADDRESS")
    private String address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ATTENDANCE_ID")
    private Attendance attendance;


}
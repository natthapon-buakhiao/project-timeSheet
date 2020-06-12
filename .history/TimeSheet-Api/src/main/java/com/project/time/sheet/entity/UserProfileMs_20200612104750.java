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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import lombok.Data;

// @EnableAutoConfiguration
@Data
@Entity
@Table (name = "USER_PROFILE_MS")
public class UserProfileMs {    
    // @Id
	// @Column(name="USER_PROFILE_ID", unique = true, nullable = false)
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @Id

    @Column(name = "FIRSTNAME")
    private String firstName;

    @Column(name = "LASTNAME")
    private String lastName;

    @Column(name = "BIRTHDAY")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date birthday;

    @Column(name = "AGE")
    private int age;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "POSITION")
    private String position;

    @Column(name = "SITE")
    private String site;


}
package com.project.time.sheet.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Entity
@Table (name = "USER_PROFILE_MS")
public class UserProfileMs  implements Serializable { 
    private static final long serialVersionUID = 1L;   

    @EmbeddedId
    private UserProfileMsPk id;

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



}
package com.project.time.sheet.common.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.time.sheet.entity.User;

import lombok.Data;

@Data
public class UserProfileMsBean {

    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    private String firstName;
    private String lastName;
    private Date birthday;
    private int age;
    private String address;
    private String position;

    
}
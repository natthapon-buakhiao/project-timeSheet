package com.project.time.sheet.common.models;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.time.sheet.entity.User;

import lombok.Data;

@Data
public class UserProfileMsBean implements Serializable {
    private static final long serialVersionUID = 1L;

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
package com.project.time.sheet.module.profile.models;

import java.util.Date;
import lombok.Data;

@Data
public class ReqEditProfile {
    private String userCode;
    private String firstName;
    private String lastName;
    private Date birthday;
    private int age;
    private String address;
    private String position;

}
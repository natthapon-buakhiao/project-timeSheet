package com.project.time.sheet.common.models;

import java.util.Date;

import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.User;

public class AttendanceBean {
    private Long id;
    private User user;
    private Date date;
    private String timeOut;
    private String task;
    private Project project;
    private String site;
    
}
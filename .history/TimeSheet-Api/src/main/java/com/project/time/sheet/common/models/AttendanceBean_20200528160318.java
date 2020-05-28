package com.project.time.sheet.common.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.User;
import lombok.Data;

@Data

public class AttendanceBean {
    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    private Date date;
    private String timeOut;
    private String task;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Project project;
    private String site;
    private String timeOut;
    
}
package com.project.time.sheet.common.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.time.sheet.entity.User;

import lombok.Data;

@Data
public class ReportBean {

    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    private Date startDate;
    
}
package com.project.time.sheet.common.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
public class ReportBean {

    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    
}
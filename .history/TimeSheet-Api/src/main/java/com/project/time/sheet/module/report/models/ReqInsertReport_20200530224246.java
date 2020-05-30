package com.project.time.sheet.module.report.models;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInsertReport {

    private String userCode;
    private Date startDate;
    private Date endDate;
    private int totalHours;
    private String task;
    private String feedBack;
    private String goal;
    
}
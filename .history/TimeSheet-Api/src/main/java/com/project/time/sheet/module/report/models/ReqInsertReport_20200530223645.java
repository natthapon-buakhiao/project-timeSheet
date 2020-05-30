package com.project.time.sheet.module.report.models;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInsertReport {

    private String userCode;
    private Date dateIn;
    private Date dateOut;
    private int totalHours;
    private String task;
    private String feedBack;
    
}
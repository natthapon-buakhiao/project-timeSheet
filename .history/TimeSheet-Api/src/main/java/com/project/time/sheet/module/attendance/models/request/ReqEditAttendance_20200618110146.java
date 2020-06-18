package com.project.time.sheet.module.attendance.models.request;

import java.util.Date;

import lombok.Data;

@Data
public class ReqEditAttendance {

    private Long id;
    private Date date;
    private String task;
    private String projectCode;
    private String siteCode;
    private String timeIn;
    private String timeOut;
    
}
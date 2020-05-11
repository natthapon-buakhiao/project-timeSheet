package com.project.time.sheet.module.attendance.models.request;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInsertAttendance {
    
    private Date date;
    private String task;
    private String project;
    private String site;
    private String timeIn;
    private String timeOut;

}
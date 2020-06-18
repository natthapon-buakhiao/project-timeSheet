package com.project.time.sheet.module.attendance.models.request;
import lombok.Data;

@Data
public class ReqEditAttendance {

    private String userCode;
    private Date date;
    private String task;
    private String projectCode;
    private String siteCode;
    private String timeIn;
    private String timeOut;
    
}
package com.project.time.sheet.module.attendance.models.request;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInsertAttendance {
    private String userCode;
    private Date date;
    private String task;
    private String projectCode;
    private String site;
    private String timeIn;
    private String timeOut;

}
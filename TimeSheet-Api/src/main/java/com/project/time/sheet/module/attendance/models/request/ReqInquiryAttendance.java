package com.project.time.sheet.module.attendance.models.request;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInquiryAttendance {
    private String userCode;
    private Date date;
    
}
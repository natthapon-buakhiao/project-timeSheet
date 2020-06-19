package com.project.time.sheet.module.userProject.models;

import java.util.Date;

import lombok.Data;

@Data

public class ReqInsertUserProject {

    private String userCode;
    private String projectCode;
    private String task;
    private Date date;

}
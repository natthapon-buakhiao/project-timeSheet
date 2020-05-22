package com.project.time.sheet.module.project.models;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInsertProject {

    private String projectCode;
    private String projectName;
    private String description;
    private String userCodeSupervisor;
    private Date date;
}
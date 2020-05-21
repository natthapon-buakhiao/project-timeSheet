package com.project.time.sheet.module.project.models;

import java.util.Date;

import lombok.Data;

@Data
public class ReqInsertProject {

    private String projectName;
    private String description;
    private String userCodeSupervisor;
    private String userCodeEmployee;
    private Date date;
    
}
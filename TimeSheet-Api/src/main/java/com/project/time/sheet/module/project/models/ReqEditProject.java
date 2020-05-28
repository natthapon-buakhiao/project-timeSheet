package com.project.time.sheet.module.project.models;

import lombok.Data;

@Data
public class ReqEditProject {

    private String projectCode;
    private String projectName;
    private String description;
    private String userCodeSupervisor;
    
}
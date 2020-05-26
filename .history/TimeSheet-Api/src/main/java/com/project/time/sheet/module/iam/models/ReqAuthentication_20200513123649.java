package com.project.time.sheet.module.iam.models;

import lombok.Data;

@Data
public class ReqAuthentication {
    private String isIamAdmin;
    private String password ;
    private String userCode  ;
    
}
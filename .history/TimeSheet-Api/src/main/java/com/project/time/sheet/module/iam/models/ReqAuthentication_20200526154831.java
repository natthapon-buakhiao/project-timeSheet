package com.project.time.sheet.module.iam.models;

import lombok.Data;

@Data
public class ReqAuthentication {
    private String isIamAdmin = "N";
    private String password ;
    private String userCode  ;
    
}
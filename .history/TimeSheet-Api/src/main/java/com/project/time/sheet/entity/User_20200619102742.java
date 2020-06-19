package com.project.time.sheet.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table (name = "USER_MS")
public class User {
    
    @Id
    @Column(name = "USER_CODE")
    private String userCode;

    @Column(name = "LINE_MANAGER")
    private String lineManager;
    
    
}
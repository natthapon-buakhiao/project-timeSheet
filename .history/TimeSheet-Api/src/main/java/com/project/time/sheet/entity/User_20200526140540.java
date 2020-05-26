package com.project.time.sheet.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table (name = "USER")
public class User {
    @Id
    @Column(name = "USER_CODE")
    private String userCode;

    @Column(name = "ROLE")
    private String role;
    
    
}
package com.project.time.sheet.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import lombok.Data;

// @EnableAutoConfiguration
@Data
@Entity
@Table (name = "USER_MS")
public class User {
    @Id
    @Column(name = "USER_CODE")
    private String userCode;

    private String lineManager;
    
    
}
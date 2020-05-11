package com.project.time.sheet.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table (name = "USER_PROJECT")
public class UserProject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @ManyToOne
    @JoinColumn(name = "USERS_USER_CODE", referencedColumnName = "USER_CODE", insertable = false, updatable = false)
    private User userCodes;

    @Id
    @ManyToOne
    @JoinColumn(name = "PROJECTS_PROJECT_ID ", referencedColumnName = "PROJECT_ID", insertable = false, updatable = false)
    private Project projects;
    
}
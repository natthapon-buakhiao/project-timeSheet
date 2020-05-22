package com.project.time.sheet.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class UserProjectPk implements Serializable {

    private static final long serialVersionUID = 1L;
	
	@Column(name="USER_CODE")
	private String userCode;
	
	@Column(name="PROJECT_CODE")
	private String projectCode;
    
}
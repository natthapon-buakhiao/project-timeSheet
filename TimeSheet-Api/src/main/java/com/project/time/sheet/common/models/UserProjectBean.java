package com.project.time.sheet.common.models;

import java.io.Serializable;
import java.util.Date;

import com.project.time.sheet.entity.UserProjectPk;

import lombok.Data;

@Data

public class UserProjectBean implements Serializable {

    private static final long serialVersionUID = 1L;
    private UserProjectPk id;
    private String task;
    private Date date;
    
}
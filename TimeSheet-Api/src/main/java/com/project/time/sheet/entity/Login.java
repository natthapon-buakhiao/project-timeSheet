package com.project.time.sheet.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Entity
@Data
@Table(name="login")

public class Login{
    @Id
    @SequenceGenerator(name="userId_seq",sequenceName="userId_seq")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="userId_seq")
    private Long userId;
    private String userCode;
    @JsonIgnore
    private String password;
    boolean isLogin;
    // private String isIamAdmin;

}
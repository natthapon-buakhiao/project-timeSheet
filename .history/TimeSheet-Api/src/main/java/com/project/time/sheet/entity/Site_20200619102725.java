package com.project.time.sheet.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "SITE")
public class Site {

    @Id
    @Column(name = "SITE_CODE")
    private String siteCode;

    @Column(name = "SITE")
    private String site;

}
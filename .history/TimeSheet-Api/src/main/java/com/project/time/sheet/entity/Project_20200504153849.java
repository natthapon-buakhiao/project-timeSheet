package com.project.time.sheet.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table (name = "PROJECT")
public class Project {
    @Id
	@Column(name="PROJECT_ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PROJECT_NAME")
    private String projectName;

    @Column(name = "DESCRIPTION")
    private String description;

    @ManyToOne
    @JoinColumn(name = "ATTENDANCE_ID", referencedColumnName = "role_id", insertable = false, updatable = false)
    private Attendance userId;

    @ManyToOne()
@JoinColumn(name="role_id", referencedColumnName = "role_id", insertable = false, updatable = false)    
private UserRole userRole;
    



}
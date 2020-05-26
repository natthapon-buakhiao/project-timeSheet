package com.project.time.sheet.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


@Data
@Entity
@Table (name = "ATTENDANCE")
public class Attendance {
    @Id
	@Column(name="ATTENDANCE_ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
	@JoinColumn(name = "USER_CODE")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private User user;
    
    @Column(name = "DATE")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    @Column(name = "TIME_IN")
    private String timeIn;

    @Column(name = "TIME_OUT")
    private String timeOut;

    @Column(name = "TASK")
    private String task;



    @ManyToOne
	@JoinColumn(name = "PROJECT_CODE")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Project project;

    @Column(name = "SITE")
    private String site;




}
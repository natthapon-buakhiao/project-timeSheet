package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjectRepository extends JpaRepository<Project, String> {


    // @Query(value = "SELECT * PROJECT WHERE USER_ID = ?1  ORDER BY ATTENDANCE_ID",nativeQuery = true)
    // List<Project> findByUserIdOrderId(Attendance userId);
    
    @Query( "SELECT n FROM Project n WHERE n.projectCode =?1")
    Optional<Project> findByProjectCode(String projectCode);
    @Query( "SELECT n FROM Project n WHERE n.projectName =?1")
	List<Project> findAllProjectName(String projectName);
    
}
package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;
import com.project.time.sheet.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjectRepository extends JpaRepository<Project, String> {

    @Query( "SELECT n FROM Project n WHERE n.userCodeSupervisor =?1")
    List<Project> findByProjectUserCode(String userCodeSupervisor);

    @Query( "SELECT n FROM Project n WHERE n.projectCode =?1")
    Optional<Project> findByProjectCode(String projectCode);

    @Query( "SELECT n FROM Project n WHERE n.projectCode =?1")
    List<Project> findByProjectList(String projectCode);

    
    @Query( "SELECT n FROM Project n WHERE n.projectName =?1")
	List<Project> findAllProjectName(String projectName);
    
}
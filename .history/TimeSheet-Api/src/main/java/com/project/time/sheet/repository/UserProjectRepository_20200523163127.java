package com.project.time.sheet.repository;

import java.util.List;

import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProjectRepository extends JpaRepository<UserProject ,UserProjectPk> {

    List<UserProject> findById_UserCode(UserProfileMs userCode);

    List<UserProject> findById_ProjectCode(Project projectCode);
    
}
package com.project.time.sheet.repository;

import java.util.List;

import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProjectRepository extends JpaRepository<UserProject ,UserProjectPk> {

    @Query( "SELECT n FROM UserProject n WHERE n.id.userCode =?1")
    List<UserProject> findAllUserCode(String userCode);

    @Query( "SELECT n FROM UserProject n WHERE n.id.userCode =?1")
    List<UserProject> findAll(String userCode);
    
}
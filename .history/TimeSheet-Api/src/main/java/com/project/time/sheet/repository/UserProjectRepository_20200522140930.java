package com.project.time.sheet.repository;

import java.util.List;

import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProjectRepository extends JpaRepository<UserProject ,UserProjectPk> {

    @Query( "SELECT n FROM UserProject n WHERE n.uId.userCode =?1")
    List<UserProject> findAllUId(String u);
    
}
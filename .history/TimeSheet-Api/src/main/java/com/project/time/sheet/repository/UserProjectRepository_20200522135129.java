package com.project.time.sheet.repository;

import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProjectRepository extends JpaRepository<UserProject ,UserProjectPk> {

    @Query( "SELECT n FROM UserProfileMs n WHERE n.userCode = ?1")
    List<UserProject> findByUserCode(String userCode);
    
}
package com.project.time.sheet.repository;

import java.util.List;

import com.project.time.sheet.entity.UserProfileMs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProfileMsRepository extends JpaRepository<UserProfileMs, String> {

    @Query("SELECT n FROM Student n WHERE n.name = ?1 and n.lastname = ?2")
    List<UserProfileMs> findByUserCode(String name,String lastname);
    
}
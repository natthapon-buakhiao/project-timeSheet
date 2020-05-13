package com.project.time.sheet.repository;

import com.project.time.sheet.entity.UserProfileMs;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileMsRepository extends JpaRepository<UserProfileMs, String> {

    @Query("SELECT n FROM Student n WHERE n.name = ?1 and n.lastname = ?2")
    List<Student> findByNameAndLastname(String name,String lastname);
    
}
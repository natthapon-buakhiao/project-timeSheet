package com.project.time.sheet.repository;

import com.project.time.sheet.entity.UserProfileMs;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileMsRepository extends JpaRepository<UserProfileMs, String> {
    
}
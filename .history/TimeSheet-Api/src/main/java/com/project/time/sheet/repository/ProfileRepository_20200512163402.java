package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Profile;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<UserProfileMs, String> {
    
}
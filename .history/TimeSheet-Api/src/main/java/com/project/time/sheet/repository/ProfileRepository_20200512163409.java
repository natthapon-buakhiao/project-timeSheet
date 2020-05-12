package com.project.time.sheet.repository;


import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<UserProfileMs, String> {
    
}
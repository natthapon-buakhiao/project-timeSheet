package com.project.time.sheet.repository;

import com.project.time.sheet.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    
}
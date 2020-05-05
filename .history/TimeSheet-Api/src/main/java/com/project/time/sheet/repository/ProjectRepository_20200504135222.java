package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, String> {
    
}
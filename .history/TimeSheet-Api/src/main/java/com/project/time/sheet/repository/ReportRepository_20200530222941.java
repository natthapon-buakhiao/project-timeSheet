package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Report;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    
}
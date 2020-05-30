package com.project.time.sheet.repository;

import java.util.List;

import com.project.time.sheet.entity.Report;
import com.project.time.sheet.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query( "SELECT n FROM Report n WHERE n.user = ?1")
    List<Report> findByUserList(User user);
    
}
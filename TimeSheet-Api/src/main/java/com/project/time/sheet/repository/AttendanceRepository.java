package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, String>{

}
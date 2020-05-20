package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AttendanceRepository extends JpaRepository<Attendance, String>{
    @Query( "SELECT n FROM Attendance n WHERE n.userCode =?1")
    List<Attendance> findAllUserCode(String userCode);

}
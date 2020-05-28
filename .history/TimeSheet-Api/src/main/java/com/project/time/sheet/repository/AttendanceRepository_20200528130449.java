package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AttendanceRepository extends JpaRepository<Attendance, String>{
    @Query( "SELECT n FROM Attendance n WHERE n.user = ?1")
    Optional<Attendance> findByUser(User user);

    @Query( "SELECT n FROM Attendance n WHERE n.user = ?1")
    List<Attendance> findByUserList(User user);

}
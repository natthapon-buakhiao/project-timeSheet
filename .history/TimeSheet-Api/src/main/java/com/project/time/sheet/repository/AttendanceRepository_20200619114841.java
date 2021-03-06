package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AttendanceRepository extends JpaRepository<Attendance, Long>{
    @Query( "SELECT n FROM Attendance n WHERE n.user = ?1")
    Optional<Attendance> findByUser(User user);

    @Query(value =  "SELECT * FROM ATTENDANCE a WHERE a.USER_CODE = :USER_CODE AND to_char( a.DATE , 'yyyy/MM' ) = :DATE " , nativeQuery = true )
    List<Attendance> findByUserANDDate(@Param("USER_CODE") User userCode, @Param("DATE")  String date);


}
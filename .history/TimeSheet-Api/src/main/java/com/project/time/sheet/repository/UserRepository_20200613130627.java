package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProfileMsPk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {

    
    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    Optional<User> findByUserCode(String userCode);

    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    List<User> findAllUserCode(String userCode);

    @Query(value =  "SELECT USER_PROFILE_MS.*  ((FROM USER_MS " + 
    "INNER JOIN USER_PROFILE_MS ON USER_MS.USER_CODE = USER_PROFILE_MS.USER_CODE " + 
    "AND USER_MS.LINE_MANAGER = :line_manager) " + 
    "INNER JOIN ATTENDANCE ON USER_MS.USER_CODE = ''" + 
    "AND ATTENDANCE.SITE_CODE = :site_code)"  , nativeQuery = true )
    List<UserProfileMsPk> findByAllStaff();

    // List<User> findByAllStaff(@Param("line_manager")  String lineManager, @Param("site_code")  String siteCode);
    
}
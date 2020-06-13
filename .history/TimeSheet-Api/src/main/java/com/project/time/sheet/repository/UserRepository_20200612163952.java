package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {

    
    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    Optional<User> findByUserCode(String userCode);

    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    List<User> findAllUserCode(String userCode);

    @Query(value =  "SELECT * " , nativeQuery = true )
    List<User> findByUserANDDate(@Param("line_manager")  String lineManager, @Param("site_code")  String siteCode);
    
}
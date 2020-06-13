package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {

    
    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    Optional<User> findByUserCode(String userCode);

    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    List<User> findAllUserCode(String userCode);

    @Query(value =  "SELECT * FROM ATTENDANCE a WHERE a.USER_CODE = :USER_CODE AND to_char( a.DATE , 'yyyy/MM' ) = :DATE " , nativeQuery = true )
    List<User> findByUserANDDate(@Param("USER_CODE") User userCode, @Param("DATE")  String date);
    
}
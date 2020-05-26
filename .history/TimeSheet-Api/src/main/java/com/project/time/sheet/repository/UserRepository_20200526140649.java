package com.project.time.sheet.repository;

import com.project.time.sheet.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    
    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    Optional<User> findByUserCode(String userCode);

    @Query( "SELECT n FROM User n WHERE n.userCode = ?1")
    List<User> findAllUserCode(String userCode);
    
}
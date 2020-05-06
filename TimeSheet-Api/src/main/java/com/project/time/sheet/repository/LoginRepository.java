package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository <Login, Long>{
    Login findByUserCodeAndPassword(String userCode, String password);
    Login findById(long loginId);
}